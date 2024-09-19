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
      <body
        className={`${nunito.className} antialiased bg-base-100 text-white`}
      >
        <Providers>
          <div className="text-2xl text-center pt-4 pb-2 mb-4 font-mono border-b-2 border-primary bg-info">
            ToDo Dashboard
          </div>
          {children}
          <Navbar />
        </Providers>
      </body>
    </html>
  );
}
