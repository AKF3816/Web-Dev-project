import prisma from "./prisma";

export async function getAll() {
  return await prisma.comment.findMany({
    select: {
      commentID: true,
      content: true,
      timeStamp: true,
      UserID: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
    orderBy: {
      timeStamp: "desc",
    },
  });
}

export async function getById(commentID) {
  return await prisma.comment.findUnique({
    where: { commentID },
    select: {
      commentID: true,
      content: true,
      timeStamp: true,
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

export async function getByUser(UserID) {
  return await prisma.comment.findMany({
    where: { UserID },
    orderBy: {
      timeStamp: "desc",
    },
  });
}

export async function create(data) {
  return await prisma.comment.create({
    data: {
      content: data.content,
      UserID: data.UserID,
    },
  });
}

export async function remove(commentID) {
  return await prisma.comment.delete({
    where: { commentID },
  });
}