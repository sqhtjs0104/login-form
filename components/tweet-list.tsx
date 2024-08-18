"use client";

import { getMoreTweets } from "@/app/(main)/actions";
import { ITweet } from "@/app/(main)/page";
import { useState } from "react";
import Tweet from "./tweet";

export default function TweetList({
  initialTweets
}: {
  initialTweets: ITweet[];
}) {
  const [pageNum, setPageNum] = useState(1);
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  const onLoadMoreClick = async () => {
    setIsLoading(true);
    const newTweets = await getMoreTweets(pageNum * 1);
    if (newTweets.length !== 0) {
      setPageNum((prev) => prev + 1);
      setTweets((prev) => [...prev, ...newTweets]);
    } else {
      setIsLastPage(true);
    }
    setIsLoading(false);
  }

  return (
    <div className="p-5 flex flex-col gap-5">
      {
        tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))
      }
      {
        isLastPage || (
          <button disabled={isLoading} onClick={onLoadMoreClick}>
            {
              isLoading
                ? "Loading..."
                : "Load more"
            }
          </button>
        )
      }
    </div>
  )
}