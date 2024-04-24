import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wallet Interaction",
  description: "Demo wallet interaction using rainbowkit wagmi",
};

export default function Home() {
  return (
    <main>
      <ConnectButton></ConnectButton>
    </main>
  );
}
