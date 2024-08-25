import FormInput from "@/components/form-input";
import db from "@/lib/db";
import getSession from "@/lib/session";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      }
    });
    return user;
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  if (!user) notFound();

  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="font-bold text-2xl">Hello</h2>
      <h3 className="font-medium text-xl">
        Welcome, <span className="font-medium text-2xl text-blue-800">
          {user.username}
        </span>
        . Good to see you again.
      </h3>
    </div>
  )
}