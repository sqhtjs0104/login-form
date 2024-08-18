"use client";

import { TweetsResponse } from "@/app/(main)/tweets/[id]/actions";
import { formatDateTime } from "@/lib/util";
import { useOptimistic } from "react";

export default function TweetsResponses({
  responses,
}: {
  responses: TweetsResponse
}) {
  const [responseState, responseReducer] = useOptimistic(
    responses,
    (prev, payload) => [...responses, {
      updated_at: new Date(),
      user: {
        username: "New",
      },
      payload: "Writing new response...",
    }]
  );

  return (
    <div className="flex flex-col gap-4">
      {responseState.map((response, i) => (
        <div key={i} className="flex flex-col gap-1">
          <span className="px-3">{response.payload}</span>
          <div className="flex justify-end gap-3 text-xs">
            <span>{formatDateTime(response.updated_at)}</span>
            <span>{response.user.username}</span>
          </div>
        </div>
      ))}
    </div>
  );
}