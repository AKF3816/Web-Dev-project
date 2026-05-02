import { PrismaClient } from "../prisma/client/index.js";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: "file:prisma/data/dev.db",
});

const prisma = new PrismaClient({
  adapter,
});

export default prisma;