"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR, USERNAME_MIN_LENGTH } from "@/lib/constant";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";

const checkUsername = (username: string) => !username.includes("admin");
const checkPassword = ({ password, confirm_password }: { password: string; confirm_password: string }) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Must only string",
        required_error: "Required"
      })
      .min(USERNAME_MIN_LENGTH, "Too short")
      .toLowerCase()
      .trim()
      .refine(checkUsername, "Not allowed name"),
    email: z
      .string()
      .email(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, "Too short")
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, "Too short"),
    bio: z
      .string()
      .trim()
      .optional(),
  })
  .refine(checkPassword, {
    message: "Both passwords should be the same",
    path: ["confirm_password"],
  });

export async function updateUserInfo(prevState: any, formData: FormData) {
  const id = Number(formData.get("id"));

  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
    bio: formData.get("bio"),
  }

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    await db.user.update({
      where: {
        id
      },
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
        bio: result.data.bio,
      }
    });

    redirect(`/users/${data.username}`);
  }
}