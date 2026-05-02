import prisma from "./prisma";

export async function getAll() {
  return await prisma.like.findMany({
    select: {
      id: true,
      postID: true,
      UserID: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      post: {
        select: {
          id: true,
          content: true,
        },
      },
    },
  });
}

export async function getById(id) {
  return await prisma.like.findUnique({
    where: { id },
    select: {
      id: true,
      postID: true,
      UserID: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      post: {
        select: {
          id: true,
          content: true,
        },
      },
    },
  });
}

export async function getByPost(postID) {
  return await prisma.like.findMany({
    where: { postID },
    select: {
      id: true,
      UserID: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
}

export async function create(data) {
  return await prisma.like.create({
    data: {
      postID: data.postID,
      UserID: data.UserID,
    },
  });
}

export async function remove(id) {
  return await prisma.like.delete({
    where: { id },
  });
}