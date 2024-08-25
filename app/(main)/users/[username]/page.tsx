import getSession from "@/lib/session";
import { getUserInfo } from "./actions";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function UserProfile({
  params: { username },
}: {
  params: { username: string; };
}) {
  const userInfo = await getUserInfo(username);
  if (!userInfo) notFound();

  const session = await getSession();

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl">Profile of <b>{username}</b></h2>

      <div className="py-1 flex flex-col gap-2">
        {LabelText("Username", username)}
        {LabelText("email", userInfo.email)}
        {LabelText("bio", (userInfo.bio ?? ""))}
      </div>

      {
        session && (session.id === userInfo.id) && (
          <Link className="text-right" href={`/users/${username}/edit`}>Edit profile?</Link>
        )
      }
    </div>
  );
}

const LabelText = (label: string, text: string) => {
  return (
    <div className="flex justify-between items-center gap-10">
      <label className="text-sm text-sky-950 font-semibold">{label}</label>
      <span className="text-gray-800 text-lg">{text}</span>
    </div>
  )
}