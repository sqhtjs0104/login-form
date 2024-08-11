"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="primary-btn h-8 text-gray-800 font-medium text-sm bg-sky-200 rounded-3xl disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed hover:bg-sky-300 hover:text-white transition"
    >
      {pending ? "Wait please..." : text}
    </button>
  );
}