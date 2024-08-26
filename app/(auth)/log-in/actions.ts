"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constant";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmailExists = async (email: string) => {
  const user = db.user.findUnique({
    where: {
      email
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
}

const formSchema = z.object({
  email: z
    .string({
      required_error: "Email is required"
    })
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "Can't find this email"),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email
      },
      select: {
        password: true,
        id: true,
      }
    });
    if (!user) {
      return {
        fieldErrors: {
          email: ["Can't find you"]
        }
      }
    }

    const ok = await bcrypt.compare(result.data.password, user!.password ?? "");
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["Wrong password"],
        }
      }
    }
  }
}