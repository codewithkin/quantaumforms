import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { WaitlistProvider } from "@/context/WaitlistContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuantumForms - AI-Powered Form Builder",
  description: "Create, customize, and share forms in seconds with AI-powered form generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="font-inter antialiased">
        <WaitlistProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
          </div>
        </WaitlistProvider>
      </body>
    </html>
  );
}
