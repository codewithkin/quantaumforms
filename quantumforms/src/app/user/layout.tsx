import Sidebar from "@/components/shared/Sidebar";
import MobileBottomBar from "@/components/shared/MobileBottomBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={`overflow-hidden antialiased bg-slate-200 flex md:flex-row flex-col-reverse min-h-screen`}
    >
      <Sidebar />
      <MobileBottomBar />

      <article className="overflow-y-scroll h-screen">
        {children}
      </article>
    </main>
  );
}
