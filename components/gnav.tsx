import getSession from "@/lib/session";
import Link from "next/link";

export default async function Gnav() {
  const session = await getSession();

  return (
    <div className="w-full flex p-2 justify-between items-end bg-slate-100 border-b border-gray-200">
      <Link href="/" className="font-bold text-xl">Home</Link>
    </div>
  )
}