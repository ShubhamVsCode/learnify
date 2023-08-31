import Sidebar from "@/components/core/Sidebar";
import Navbar from "@/components/core/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learnify",
  description: "Building Next-Gen Learning Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <section className="grid grid-cols-6">
          <aside className="px-6">
            <Sidebar />
          </aside>
          <main className="col-span-5">{children}</main>
        </section>
      </body>
    </html>
  );
}
