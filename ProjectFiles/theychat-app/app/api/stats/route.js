import * as stats from "../../../repos/stats.js";


export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const stat = searchParams.get("stat");

    // Route to a single stat if requested
    if (stat === "avgFollowers") {
      return Response.json(await stats.getAvgFollowersPerUser());
    }
    if (stat === "avgPosts") {
      return Response.json(await stats.getAvgPostsPerUser());
    }
    if (stat === "mostActive") {
      return Response.json(await stats.getMostActiveUser());
    }
    if (stat === "topLikedPosts") {
      return Response.json(await stats.getTopLikedPosts());
    }
    if (stat === "mostFollowed") {
      return Response.json(await stats.getMostFollowedUsers());
    }
    if (stat === "topWords") {
      return Response.json(await stats.getMostUsedWord());
    }
    if (stat === "inactiveUsers") {
      return Response.json(await stats.getInactiveUsers());
    }
    if (stat === "overview") {
      return Response.json(await stats.getPlatformOverview());
    }

    // Return ALL stats in one response
    const [
      avgFollowers,
      avgPosts,
      mostActive,
      topLikedPosts,
      mostFollowed,
      topWords,
      inactiveUsers,
      overview,
    ] = await Promise.all([
      stats.getAvgFollowersPerUser(),
      stats.getAvgPostsPerUser(),
      stats.getMostActiveUser(),
      stats.getTopLikedPosts(),
      stats.getMostFollowedUsers(),
      stats.getMostUsedWord(),
      stats.getInactiveUsers(),
      stats.getPlatformOverview(),
    ]);

    return Response.json({
      avgFollowers,
      avgPosts,
      mostActive,
      topLikedPosts,
      mostFollowed,
      topWords,
      inactiveUsers,
      overview,
    });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}