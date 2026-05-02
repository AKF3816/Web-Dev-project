import prisma from "./prisma";

export async function getAll() {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      bio: true,
      profilePic: true,
      _count: {
        select: {
          posts: true,
          comments: true,
          likes: true,
          following: true,
          followers: true,
        },
      },
    },
    orderBy: {
      username: "asc",
    },
  });
}

export async function getById(id) {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      bio: true,
      profilePic: true,
      posts: true,
      comments: true,
      likes: true,
      following: true,
      followers: true,
    },
  });
}

export async function create(data) {
  return await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: data.password,
      name: data.name,
      bio: data.bio,
      profilePic: data.profilePic,
    },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      bio: true,
      profilePic: true,
    },
  });
}