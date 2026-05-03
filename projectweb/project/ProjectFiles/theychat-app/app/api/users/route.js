import * as users from "../../../repos/users";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const user = await users.getById(id);

      if (!user) {
        return Response.json(
          { error: "User not found." },
          { status: 404 }
        );
      }

      return Response.json(user);
    }

    return Response.json(await users.getAll());
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "User ID is required." }, { status: 400 });
    }

    const body = await request.json();
    const updatedUser = await users.update(id, body);
    return Response.json(updatedUser);
  } catch (e) {
    console.error(e);
    if (e.code === "P2025") {
      return Response.json({ error: "User not found." }, { status: 404 });
    }
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.username || !body.email || !body.password) {
      return Response.json(
        { error: "username, email, and password are required." },
        { status: 400 }
      );
    }

    const newUser = await users.create(body);

    return Response.json(newUser, { status: 201 });
  } catch (e) {
    console.error(e);

    if (e.code === "P2002") {
      return Response.json(
        { error: "Username or email already exists." },
        { status: 400 }
      );
    }

    if (e.name === "PrismaClientValidationError") {
      return Response.json(
        { error: "Invalid user data." },
        { status: 400 }
      );
    }

    return Response.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}
