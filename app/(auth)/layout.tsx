import { Inter } from "next/font/google";
import Gnav from "@/components/gnav";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col w-full h-full">
      <Gnav />
      <div className="flex justify-center flex-1 items-center">
        {children}
      </div>
    </main>
  );
}
