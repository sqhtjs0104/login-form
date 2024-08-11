import Link from "next/link";

export default function Gnav() {
  return (
    <div className="w-full flex p-2 justify-between bg-slate-100 border-b border-gray-200">
      <Link href="/" className="font-bold text-xl">Home</Link>
    </div>
  )
}