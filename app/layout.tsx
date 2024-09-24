import { Navbar } from "@/src/components/navbar";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo Dashboard",
  description: "Personal App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased `}>
        <Providers>
          <div className="max-w-screen-md mx-auto bg-base-100 h-screen text-primary-content flex flex-col">
            <div className="text-2xl text-center pt-4 pb-2 mb-4 border-b-4 border-primary bg-neutral">
              Tasks Dashboard
            </div>
            {children}
            <Navbar />
          </div>
        </Providers>
      </body>
    </html>
  );
}
