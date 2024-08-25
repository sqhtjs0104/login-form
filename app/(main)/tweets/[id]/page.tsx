import { notFound } from "next/navigation";
import { getCachedLikeStatus, getCachedResponses, getTweetDetail } from "./actions";
import { formatDateTime } from "@/lib/util";
import LikeButton from "@/components/like-button";
import getSession from "@/lib/session";
import AddResponse from "@/components/add-response";
import TweetsResponses from "@/components/tweets-responses";
import Link from "next/link";

export default async function DetailTweet({
  params,
}: {
  params: { id: string; };
}) {
  const tweetId = Number(params.id);
  if (isNaN(tweetId)) return notFound();

  const session = await getSession();
  const tweet = await getTweetDetail(tweetId);
  if (!tweet) notFound();

  const responses = await getCachedResponses(tweetId);
  const { likeCount, isLiked } = await getCachedLikeStatus(tweetId, session.id!);

  return (
    <div className="w-full p-10 flex flex-col gap-4">
      <div className="flex justify-between">
        <Link href={`/users/${tweet.user.username}`}>{tweet?.user.username}</Link>
        <span>{formatDateTime(tweet?.updated_at!)}</span>
      </div>
      <div>
        <textarea className="w-full resize-none rounded-md p-2" rows={4} readOnly value={tweet?.tweet}></textarea>
      </div>
      <div>
        <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={tweetId} />
      </div>
      <div className="flex flex-col gap-3">
        <AddResponse userid={session.id!} tweetId={tweetId} />
        <TweetsResponses responses={responses} />
      </div>
    </div>
  )
}