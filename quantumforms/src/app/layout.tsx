import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/shared/Sidebar";
import QueryProvider from "@/context/QueryProvider";
import { SessionProvider } from "next-auth/react";
import MobileBottomBar from "@/components/shared/MobileBottomBar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "AI-Powered Form Builder | Create Smart, Custom Forms Instantly",
  description:
    "Build and customize powerful forms effortlessly with AI-driven automation and drag-and-drop editing. No coding required! Start creating in seconds.",
  keywords:
    "AI form builder, online forms, smart forms, drag and drop form builder, no-code forms, Next.js form generator",
  authors: [{ name: "Your Name", url: "https://yourwebsite.com" }],
  metadataBase: new URL("https://yourwebsite.com"),
  openGraph: {
    title: "AI-Powered Form Builder | Create Smart, Custom Forms Instantly",
    description:
      "Create and customize forms with AI assistance. Drag, drop, and publish without coding. Perfect for businesses and creators!",
    url: "https://yourwebsite.com",
    siteName: "Your Form Builder",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Form Builder - Create Smart Forms Instantly",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Powered Form Builder | Create Smart, Custom Forms Instantly",
    description:
      "Build and customize powerful forms effortlessly with AI-driven automation and drag-and-drop editing. No coding required!",
    images: ["https://yourwebsite.com/twitter-card.jpg"],
    creator: "@yourTwitterHandle",
  },
  alternates: {
    canonical: "https://yourwebsite.com",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  themeColor: "#007bff",
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased bg-slate-200 flex md:flex-col flex-col-reverse min-h-screen`}
      >
        <QueryProvider>
          <SessionProvider>
            <Sidebar />
            <MobileBottomBar />
            {children}
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
