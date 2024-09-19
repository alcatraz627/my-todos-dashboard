import { Navbar } from "@/src/components/navbar";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={nunito.className}>
      <Navbar />
    </div>
  );
}
