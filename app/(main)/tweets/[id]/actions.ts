"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import { z } from "zod";

export async function getTweetDetail(id: number) {
  const tweet = db.tweet.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      tweet: true,
      updated_at: true,
      user: {
        select: {
          username: true
        }
      }
    }
  });

  return tweet;
}

export const getCachedTweetDetail = nextCache(
  getTweetDetail,
  ["tweet-detail"],
  {
    tags: ["tweet-detail"],
    revalidate: 60,
  }
)

async function getLikeStatus(tweetId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

export async function getCachedLikeStatus(postId: number, userId: number) {
  const cachedOperation = nextCache(
    getLikeStatus,
    ["tweet-like-status"],
    {
      tags: [`like-status-${postId}`],
    }
  );
  return cachedOperation(postId, userId);
}

export async function likeTweet(tweetId: number) {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
}

export async function dislikeTweet(tweetId: number) {
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
}

async function getResponses(tweetId: number) {
  const reponses = await db.response.findMany({
    where: {
      tweetId
    },
    select: {
      updated_at: true,
      payload: true,
      user: {
        select: {
          username: true,
        }
      }
    }
  });

  return reponses;
}


export const getCachedResponses = (tweetId: number) => {
  const cachedOperation = nextCache(
    getResponses,
    ["tweet-responses"],
    {
      tags: [`tweets-responses-${tweetId}`],
      revalidate: 60,
    }
  );

  return cachedOperation(tweetId);
}

export type TweetsResponse = Prisma.PromiseReturnType<typeof getResponses>;

const formSchema = z.object({
  payload: z
    .string()
    .min(1)
    .max(100),
  userId: z
    .number(),
  tweetId: z
    .number(),
});

export async function addResponse(prevState: any, formData: FormData) {
  const data = {
    userId: Number(formData.get("userId")),
    tweetId: Number(formData.get("tweetId")),
    payload: formData.get("payload")
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    console.log(result.error.flatten());
  } else {
    const newTweet = await db.response.create({
      data: {
        userId: result.data.userId,
        tweetId: result.data.tweetId,
        payload: result.data.payload,
      }
    });

    revalidateTag(`tweets-responses-${newTweet.tweetId}`);
  }
}