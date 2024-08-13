import db from "@/lib/db";
import getSession from "@/lib/session";
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
  return (
    <div className="flex flex-col items-center gap-2">
      <h2 className="font-bold text-2xl">Your Profile</h2>
      <h3 className="font-medium text-xl">
        Welcome, <span className="font-medium text-2xl text-blue-800">
          {user?.username}
        </span>
        . Good to see you again.
      </h3>
    </div>
  )
}