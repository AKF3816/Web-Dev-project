import * as posts from "../../../repos/posts";

export async function GET(request, context) {
  try {
    const { id } = await context.params;

    const post = await posts.getById(id);

    if (!post) {
      return Response.json(
        { error: "Post not found." },
        { status: 404 }
      );
    }

    return Response.json(post);
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  try {
    const { id } = await context.params;

    const deletedPost = await posts.remove(id);

    return Response.json(deletedPost);
  } catch (e) {
    console.error(e);

    if (e.code === "P2025") {
      return Response.json(
        { error: "Post not found." },
        { status: 404 }
      );
    }

    return Response.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}