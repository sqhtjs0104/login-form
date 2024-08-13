"use client";

import Link from "next/link";

export default function Hello() {

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-black font-bold text-3xl">Hello Stranger</h1>

      <div className="flex gap-2 justify-center">
        <Link href="/log-in">Log In</Link>
        <span className="text-blue-500">/</span>
        <Link href="/create-account">Join Us</Link>
      </div>
    </div>
  );
}
