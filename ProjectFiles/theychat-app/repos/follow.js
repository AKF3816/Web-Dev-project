import prisma from "./prisma.js";

export async function getFollowers(userID) {
  return await prisma.follow.findMany({
    where: { Followed_byID: userID },
    select: {
      follower: {
        select: {
          id: true,
          username: true,
        }
      }
    }
  })
}


export async function createFollow(followerID, followedID) {
  return await prisma.follow.create({
    data: {
      FollowerID: followerID,
      Followed_byID: followedID
    }
  })
}

export async function getFollowing(userID) {
  return await prisma.follow.findMany({
    where: { FollowerID: userID },
    select: {
      followed: {
        select: {
          id: true,
          username: true,
        }
      }
    }
  })
}

export async function deleteFollow(followerID, followedID) {
  return await prisma.follow.deleteMany({
    where: {
      FollowerID: followerID,
      Followed_byID: followedID
    }
  })
}


