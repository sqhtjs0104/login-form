import { ITweet } from "@/app/(main)/page";
import { formatDateTime } from "@/lib/util";
import Link from "next/link";

export default function Tweet({
  tweet
}: {
  tweet: ITweet
}) {
  return (
    <Link href={`/tweets/${tweet.id}`} className="text-slate-600">
      <div>{tweet.user.username}</div>
      <div>{tweet.tweet}</div>
      <div>{formatDateTime(tweet.updated_at)}</div>
    </Link>
  );
}