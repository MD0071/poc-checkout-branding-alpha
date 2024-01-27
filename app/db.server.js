import { PrismaClient } from "@prisma/client";
import { connectionDb } from "./routes/database/conn";

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  connectionDb()
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
}
export default prisma;
