"use client";

import { useFormState } from "react-dom";
import { handleForm } from "./actions";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-btn";

export default function Home() {
  const [state, action] = useFormState(handleForm, null);

  return (
    <div>
      <form action={action} className="flex flex-col gap-4 w-[400px]">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          errors={[]}
          required
        />
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          errors={[]}
          required
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          errors={state?.errors ?? []}
          required
        />

        <FormButton text="Log in" />

        {
          state?.sucess &&
          <div className="rounded-xl bg-green-500 p-3">Welcome back!</div>
        }
      </form>
    </div>
  );
}
