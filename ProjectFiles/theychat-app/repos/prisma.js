import { PrismaClient } from "../prisma/client/index.js";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const url = `file:///${process.cwd().replace(/\\/g, '/')}/prisma/data/dev.db`;
const adapter = new PrismaLibSql({ url });

const prisma = new PrismaClient({
  adapter,
});

export default prisma;