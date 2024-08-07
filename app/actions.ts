"use server";

import { z } from "zod";
import validator from "validator";
import { USERNAME_MIN_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "@/lib/constants";

const checkEmail = (email: string) => {
  return (
    validator.isEmail(email)
    &&
    email.endsWith("@zod.com")
  );
}

const formSchema = z.object({
  email: z.string().email().trim().refine(checkEmail, "Only @zod.com emails are allowed"),
  username: z.string().trim().min(USERNAME_MIN_LENGTH, "Too short"),
  password: z.string().min(PASSWORD_MIN_LENGTH, "Too short").regex(PASSWORD_REGEX, "Should contain at least one number (0-9)")
});

export async function handleForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  }

  const result = formSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}