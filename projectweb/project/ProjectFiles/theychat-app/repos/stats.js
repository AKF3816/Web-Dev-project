import prisma from "./prisma.js";



// STAT 1: Average number of followers per user
export async function getAvgFollowersPerUser() {
  const result = await prisma.follow.groupBy({
    by: ["Followed_byID"],
    _count: { Followed_byID: true },
  });

  if (result.length === 0) return { avg: 0, totalUsers: 0, totalFollows: 0 };

  const totalFollows = result.reduce((sum, r) => sum + r._count.Followed_byID, 0);
  const totalUsers = await prisma.user.count();

  return {
    avg: parseFloat((totalFollows / totalUsers).toFixed(2)),
    totalUsers,
    totalFollows,
  };
}

// STAT 2: Average number of posts per user
export async function getAvgPostsPerUser() {
  const totalPosts = await prisma.post.count();
  const totalUsers = await prisma.user.count();

  return {
    avg: totalUsers > 0 ? parseFloat((totalPosts / totalUsers).toFixed(2)) : 0,
    totalPosts,
    totalUsers,
  };
}

// STAT 3: Most active user (most posts + comments combined) in the last 3 months
export async function getMostActiveUser() {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  // Get post counts per user in last 3 months
  const postCounts = await prisma.post.groupBy({
    by: ["postAuthorID"],
    where: { timeStamp: { gte: threeMonthsAgo } },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
  });

  // Get comment counts per user in last 3 months
  const commentCounts = await prisma.comment.groupBy({
    by: ["UserID"],
    where: { timeStamp: { gte: threeMonthsAgo } },
    _count: { commentID: true },
  });

  // Merge the two maps
  const activityMap = {};
  for (const p of postCounts) {
    activityMap[p.postAuthorID] = (activityMap[p.postAuthorID] || 0) + p._count.id;
  }
  for (const c of commentCounts) {
    activityMap[c.UserID] = (activityMap[c.UserID] || 0) + c._count.commentID;
  }

  if (Object.keys(activityMap).length === 0) return null;

  const topUserId = Object.entries(activityMap).sort((a, b) => b[1] - a[1])[0][0];
  const totalActivity = activityMap[topUserId];

  const user = await prisma.user.findUnique({
    where: { id: topUserId },
    select: { id: true, username: true, name: true },
  });

  return { user, totalActivity, since: threeMonthsAgo };
}

// STAT 4: Top 5 most liked posts
export async function getTopLikedPosts() {
  return await prisma.post.findMany({
    select: {
      id: true,
      content: true,
      timeStamp: true,
      postAuthor: { select: { username: true } },
      _count: { select: { likes: true, comments: true } },
    },
    orderBy: { likes: { _count: "desc" } },
    take: 5,
  });
}

// STAT 5: Most followed users (top 5)
export async function getMostFollowedUsers() {
  const counts = await prisma.follow.groupBy({
    by: ["Followed_byID"],
    _count: { Followed_byID: true },
    orderBy: { _count: { Followed_byID: "desc" } },
    take: 5,
  });

  const userIds = counts.map((c) => c.Followed_byID);

  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, username: true, name: true },
  });

  // Map user details to counts
  return counts.map((c) => ({
    user: users.find((u) => u.id === c.Followed_byID),
    followerCount: c._count.Followed_byID,
  }));
}

// STAT 6: Most frequently used word across all posts
export async function getMostUsedWord() {
  const posts = await prisma.post.findMany({
    select: { content: true },
  });

  // Build word frequency map in app layer (no DB alternative for NLP)
  const stopWords = new Set([
    "the", "a", "an", "is", "it", "in", "on", "at", "to", "and",
    "or", "but", "i", "my", "me", "we", "he", "she", "they", "this",
    "that", "of", "for", "with", "not", "no", "so", "be", "are", "was",
    "have", "has", "do", "did", "will", "just", "like", "been"
  ]);

  const wordMap = {};
  for (const post of posts) {
    const words = post.content
      .toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !stopWords.has(w));

    for (const word of words) {
      wordMap[word] = (wordMap[word] || 0) + 1;
    }
  }

  const sorted = Object.entries(wordMap).sort((a, b) => b[1] - a[1]).slice(0, 10);
  return sorted.map(([word, count]) => ({ word, count }));
}

// STAT 7: Users with zero posts (inactive accounts)
export async function getInactiveUsers() {
  return await prisma.user.findMany({
    where: { posts: { none: {} } },
    select: { id: true, username: true, name: true, email: true },
    orderBy: { username: "asc" },
  });
}

// STAT 8: Total platform overview counts
export async function getPlatformOverview() {
  const [users, posts, comments, likes, follows] = await Promise.all([
    prisma.user.count(),
    prisma.post.count(),
    prisma.comment.count(),
    prisma.like.count(),
    prisma.follow.count(),
  ]);

  return { users, posts, comments, likes, follows };
}