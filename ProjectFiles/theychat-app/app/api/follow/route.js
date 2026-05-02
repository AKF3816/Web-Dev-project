import * as followRepo from "../../../repos/follow";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userID = searchParams.get("userID");
    const followingID = searchParams.get("followingID");

    if (followingID) {
      const following = await followRepo.getFollowing(followingID);
      return Response.json(following);
    }

    if (!userID) {
      return Response.json({ error: "userID or followingID is required." }, { status: 400 });
    }

    const followers = await followRepo.getFollowers(userID);
    return Response.json(followers);
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.followerID || !body.followedID) {
      return Response.json({ error: "followerID and followedID are required." }, { status: 400 });
    }

    const result = await followRepo.createFollow(body.followerID, body.followedID);
    return Response.json(result, { status: 201 });
  } catch (e) {
    console.error(e);
    if (e.code === "P2002") {
      return Response.json({ error: "Already following." }, { status: 400 });
    }
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
