import type { Metadata } from "next";
import HomePage from "./components/HomePage/HomePage";

export const metadata: Metadata = {
  title: "Wallet Interaction",
  description: "Demo wallet interaction using rainbowkit wagmi",
};

export default function Home() {
  return (
    <main>
      <HomePage></HomePage>
    </main>
  );
}
