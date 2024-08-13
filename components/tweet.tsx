import { ITweet } from "@/app/(main)/page";
import { formatDateTime } from "@/lib/util";

export default function Tweet({
  tweet
}: {
  tweet: ITweet
}) {
  return (
    <div>
      <div>{tweet.user.username}</div>
      <div>{tweet.tweet}</div>
      <div>{formatDateTime(tweet.updated_at)}</div>
    </div>
  );
}