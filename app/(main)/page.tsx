import TweetList from "@/components/tweet-list";
import db from "@/lib/db";

async function getInitialTweets() {
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
    take: 1,
    orderBy: {
      updated_at: "desc",
    }
  });

  return result;
}

export interface ITweet {
  tweet: string;
  id: number;
  created_at: Date;
  updated_at: Date;
  user: {
    username: string;
  };
}

export default async function Home() {
  const initialTweets = await getInitialTweets();

  return (
    <div>
      <TweetList initialTweets={initialTweets} />
    </div>
  );
}