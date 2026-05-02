import prisma from "./prisma";

export async function getAll() {
  return await prisma.post.findMany({
    select: {
      id: true,
      content: true,
      timeStamp: true,
      postAuthor: {
        select: {
          id: true,
          username: true,
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
    orderBy: {
      timeStamp: "desc",
    },
  });
}

export async function getById(id) {
  return await prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      content: true,
      timeStamp: true,
      postAuthor: {
        select: {
          id: true,
          username: true,
        },
      },
      comments: {
        select: {
          id: true,
          content: true,
          timeStamp: true,
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
      likes: true,
    },
  });
}

export async function getByUser(userId) {
  return await prisma.post.findMany({
    where: {
      postAuthorID: userId,
    },
    orderBy: {
      timeStamp: "desc",
    },
  });
}

export async function create(data) {
  return await prisma.post.create({
    data: {
      content: data.content,
      postAuthorID: data.userId,
    },
  });
}

export async function remove(id) {
  return await prisma.post.delete({
    where: { id },
  });
}