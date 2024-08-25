import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getUserInfo(username: string) {
  const result = db.user.findUnique({
    where: {
      username: username
    }
  });

  return result;
}

export type UserResponse = Prisma.PromiseReturnType<typeof getUserInfo>;