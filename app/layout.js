import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import InitializeUserClient from "@/components/InitializeUserClient";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Welthp",
  description: "One Stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>

          {/* 🔥 VERY IMPORTANT → User initialize call */}
          <InitializeUserClient />

          <Header />

          <main className="min-h-screen">{children}</main>

          <Toaster richColors />

          <footer className="bg-blue-50 py-12">
            <div className="mx-auto text-center p-4 bg-gray-200">
              © 2024 Welthp. All rights reserved.
            </div>
          </footer>

        </body>
      </html>
    </ClerkProvider>
  );
}
