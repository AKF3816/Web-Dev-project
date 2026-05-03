import * as posts from "../../../repos/posts";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (userId) {
      return Response.json(await posts.getByUser(userId));
    }

    return Response.json(await posts.getAll());
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.content || !body.userId) {
      return Response.json(
        { error: "content and userId are required." },
        { status: 400 }
      );
    }

    const newPost = await posts.create(body);

    return Response.json(newPost, { status: 201 });
  } catch (e) {
    console.error(e);

    if (e.name === "PrismaClientValidationError") {
      return Response.json(
        { error: "Invalid post data." },
        { status: 400 }
      );
    }

    return Response.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}