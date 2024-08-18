"use client";

import { addResponse } from "@/app/(main)/tweets/[id]/actions";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function AddResponse({
  userid,
  tweetId,
}: {
  userid: number;
  tweetId: number;
}) {
  const [state, action] = useFormState(addResponse, null);
  const [payload, setPayload] = useState("");
  const { pending } = useFormStatus();

  return (
    <form action={action} className="flex gap-1">
      <input type="hidden" value={userid} name="userId" />
      <input type="hidden" value={tweetId} name="tweetId" />
      <textarea
        name="payload"
        className="resize-none rounded-md w-full p-2 focus:outline-none"
        placeholder="Write response to tweet"
        rows={1}
        value={payload}
        onChange={(event) => setPayload(event.target.value)}
      ></textarea>
      <button
        className="px-2 rounded-lg bg-sky-200 mr-1 text-gray-500 font-semibold text-sm hover:text-gray-700 hover:bg-sky-300 transition"
        type="submit"
        disabled={pending}
      >
        {
          pending
            ? "Wait"
            : "OK"
        }
      </button>
    </form>
  );
}