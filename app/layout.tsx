import { Navbar } from "@/src/components/navbar";
import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Todo Dashboard",
  description: "Personal App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // console.log(rest);

  return (
    <html lang="en">
      <body
        className={`${nunito.className} antialiased bg-base-100 text-white`}
      >
        <div className="text-2xl text-center pt-4 pb-2 mb-4 font-mono border-b-2 border-primary bg-info">
          To Do Dashboard
        </div>
        {children}
        <Navbar />
      </body>
    </html>
  );
}
