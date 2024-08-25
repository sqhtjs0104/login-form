"use client";

import { useFormState } from "react-dom";
import FormButton from "./form-btn";
import FormInput from "./form-input";
import { updateUserInfo } from "@/app/(main)/users/[username]/edit/actions";
import { UserResponse } from "@/app/(main)/users/[username]/actions";
import { notFound } from "next/navigation";

export default function EditProfileForm({
  userInfo,
}: {
  userInfo: UserResponse
}) {
  if (!userInfo) notFound();

  const [state, action] = useFormState(updateUserInfo, null);

  return (
    <form action={action} className="flex flex-col gap-3">
      <input type="hidden" name="id" value={userInfo.id} />

      <FormInput
        name="username"
        type="text"
        placeholder="Username"
        defaultValue={userInfo.username}
        errors={state?.fieldErrors.username}
        required
      />
      <FormInput
        name="email"
        type="email"
        placeholder="Email"
        defaultValue={userInfo.email}
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
          defaultValue={userInfo.bio ?? ""}
        />
      </div>
      <FormButton text="Done" />
    </form>
  );
}