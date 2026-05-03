import * as comments from "../../../../repos/comments";

export async function GET(request, context) {
  try {
    const { id } = await context.params;

    const comment = await comments.getById(id);

    if (!comment) {
      return Response.json({ error: "Comment not found." }, { status: 404 });
    }

    return Response.json(comment);
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const { id } = await context.params;

    const deletedComment = await comments.remove(id);
    return Response.json(deletedComment);
  } catch (e) {
    console.error(e);

    if (e.code === "P2025") {
      return Response.json({ error: "Comment not found." }, { status: 404 });
    }

    return Response.json({ error: "Server error." }, { status: 500 });
  }
}