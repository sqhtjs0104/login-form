import { getUserInfo } from "../actions";
import { notFound } from "next/navigation";
import EditProfileForm from "@/components/edit-profile";

export default async function EditProfile({
  params: { username }
}: {
  params: { username: string; };
}) {
  const userInfo = await getUserInfo(username);
  if (!userInfo) notFound();

  return (
    <EditProfileForm userInfo={userInfo} />
  );
}