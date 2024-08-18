"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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
    skip: page * 5,
    take: 5,
    orderBy: {
      updated_at: "desc",
    }
  });

  return result;
}

const formSchema = z.object({
  userId: z
    .number()
    .min(1),
  tweet: z
    .string()
});

export async function addTweet(prevState: any, formData: FormData) {
  const data = {
    userId: Number(formData.get("userId")),
    tweet: formData.get("tweet")
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    console.log(result.error.flatten());
  } else {
    const newTweet = await db.tweet.create({
      data: {
        userId: result.data.userId,
        tweet: result.data.tweet
      },
      select: {
        id: true,
      }
    });

    revalidatePath("/");
  }
}