import Gnav from "@/components/gnav";

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