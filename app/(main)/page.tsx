import AddTweet from "@/components/add-tweet";
import Divider from "@/components/divider";
import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { unstable_cache as nextCache } from "next/cache";

const getCachedTweets = nextCache(
  getInitialTweets,
  ["main-tweets"],
  {
    revalidate: 60,
  }
);

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
    take: 5,
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

export const dynamic = "force-dynamic";

export default async function Home() {
  const initialTweets = await getCachedTweets();
  const session = await getSession();

  return (
    <div>
      <AddTweet userid={session.id} />
      <Divider className="my-5" />
      <TweetList initialTweets={initialTweets} />
    </div>
  );
}