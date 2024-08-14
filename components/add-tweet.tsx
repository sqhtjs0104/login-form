"use client";

import { addTweet } from "@/app/(main)/actions";
import { useFormState, useFormStatus } from "react-dom";

export default function AddTweet({
  userid
}: {
  userid?: number
}) {
  const [state, action] = useFormState(addTweet, null);
  const { pending } = useFormStatus();

  return (
    <form action={action} className="flex flex-col gap-2 min-w-[400px]">
      <input type="hidden" value={userid} name="userId" />
      <textarea
        name="tweet"
        className="resize-none rounded-md w-full p-3 border-slate-200 border focus:outline-none"
        placeholder="Write new tweet here"
        rows={5}
      ></textarea>
      <button
        className="self-end px-3 py-1 rounded-lg bg-sky-200 mr-1 text-gray-500 font-semibold text-sm hover:text-gray-700 hover:bg-sky-300 transition"
        type="submit"
        disabled={pending}
      >
        {
          pending
            ? "Wait"
            : "Post"
        }
      </button>
    </form>
  );
}