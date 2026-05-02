import * as comments from "../../../repos/comments";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const UserID = searchParams.get("UserID");
    const postID = searchParams.get("postID");

    if (postID) {
      return Response.json(await comments.getByPost(postID));
    }

    if (UserID) {
      return Response.json(await comments.getByUser(UserID));
    }

    return Response.json(await comments.getAll());
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.content || !body.UserID) {
      return Response.json(
        { error: "content and UserID are required." },
        { status: 400 }
      );
    }

    const newComment = await comments.create(body);
    return Response.json(newComment, { status: 201 });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}