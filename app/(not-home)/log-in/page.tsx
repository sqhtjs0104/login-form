"use client";

import { login } from "./actions";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-btn";
import { useFormState } from "react-dom";
import Link from "next/link";

export default function LogIn() {
  const [state, action] = useFormState(login, null);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-1">
        <h2 className="font-bold text-2xl">Log In</h2>
        <span className="font-medium text-sm">with Email and Password</span>
      </div>

      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
        />

        <FormButton
          text="Here I am"
        />

        <Link href="/create-account" className="flex justify-end text-sm">
          I don&apos;t have account
        </Link>
      </form>
    </div>
  );
}