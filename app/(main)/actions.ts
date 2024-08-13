"use server";

import db from "@/lib/db";

export async function getMoreTweets(page: number) {
  const result = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      updated_at: true,
      user: {
        select: {
          username: true,
        }
      }
    },
    skip: page,
    take: 1,
    orderBy: {
      updated_at: "desc",
    }
  });

  return result;
}