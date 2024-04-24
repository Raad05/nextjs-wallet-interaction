"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  ConnectButton,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const { WALLECT_CONNECT_ID } = process.env;

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: `${WALLECT_CONNECT_ID}`,
  chains: [sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export default function Home() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <main>
            <ConnectButton></ConnectButton>
          </main>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
