import * as likes from "../../../repos/likes";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const postID = searchParams.get("postID");

    if (postID) {
      return Response.json(await likes.getByPost(postID));
    }

    return Response.json(await likes.getAll());
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.postID || !body.UserID) {
     return Response.json(
    { error: "postID and UserID are required." },
    { status: 400 }
  );
}

    const newLike = await likes.create(body);
    return Response.json(newLike, { status: 201 });
  } catch (e) {
    console.error(e);

    if (e.code === "P2002") {
      return Response.json(
        { error: "User already liked this post." },
        { status: 400 }
      );
    }

    return Response.json({ error: "Server error." }, { status: 500 });
  }
}