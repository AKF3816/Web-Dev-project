import * as likes from "../../../../repos/likes";

export async function GET(request, context) {
  try {
    const { id } = await context.params;

    const like = await likes.getById(id);

    if (!like) {
      return Response.json({ error: "Like not found." }, { status: 404 });
    }

    return Response.json(like);
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const { id } = await context.params;

    const deletedLike = await likes.remove(id);
    return Response.json(deletedLike);
  } catch (e) {
    console.error(e);

    if (e.code === "P2025") {
      return Response.json({ error: "Like not found." }, { status: 404 });
    }

    return Response.json({ error: "Server error." }, { status: 500 });
  }
}