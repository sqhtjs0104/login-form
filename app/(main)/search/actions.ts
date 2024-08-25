import db from "@/lib/db";

export async function getTweetIncludeKeyword(keyword: string) {
  const result = await db.tweet.findMany({
    where: {
      tweet: {
        contains: keyword,
      }
    },
    select: {
      tweet: true,
      id: true,
      created_at: true,
      updated_at: true,
      user: {
        select: {
          username: true,
        }
      }
    }
  });

  return result;
}