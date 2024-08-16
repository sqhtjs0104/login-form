"use client";

import { useFormState } from "react-dom";
import { handleForm } from "./actions";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-btn";

export default function Home() {
  const [state, dispatch] = useFormState(handleForm, null);

  return (
    <div>
      <form action={dispatch} className="flex flex-col gap-4 w-[400px]">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state?.fieldErrors.username}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.fieldErrors.password}
        />

        <FormButton text="Log in" />

        {
          !state?.fieldErrors &&
          <div className="rounded-xl bg-green-500 p-3">Welcome back!</div>
        }
      </form>
    </div>
  );
}