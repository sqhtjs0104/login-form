"use client";

import { createAccount } from "./actions";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-btn";
import { useFormState } from "react-dom";
import Link from "next/link";

export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-1">
        <h2 className="font-bold text-2xl">Join Us</h2>
        <span className="font-medium text-sm">by few information...</span>
      </div>

      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          errors={state?.fieldErrors.username}
          required
        />
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          errors={state?.fieldErrors.email}
          required
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          errors={state?.fieldErrors.password}
          required
        />
        <FormInput
          name="confirm_password"
          type="password"
          placeholder="Confirm password"
          errors={state?.fieldErrors.confirm_password}
          required
        />
        <div>
          <span className="block text-gray-600 mt-4 mb-2 font-medium text-sm">Can more? (Not required)</span>
          <FormInput
            name="bio"
            type="text"
            placeholder="Bio?"
          />
        </div>

        <FormButton
          text="Here I come"
        />
        <Link href="/log-in" className="flex justify-end text-sm">
          I have account
        </Link>
      </form>
    </div>
  );
}