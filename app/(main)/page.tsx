import AddTweet from "@/components/add-tweet";
import Divider from "@/components/divider";
import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import getSession from "@/lib/session";

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
  const session = await getSession();

  return (
    <div>
      <AddTweet userid={session.id} />
      <Divider className="my-5" />
      <TweetList initialTweets={initialTweets} />
    </div>
  );
}