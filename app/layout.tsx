"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import "./globals.css";

const queryClient = new QueryClient();

const { WALLET_CONNECT_ID } = process.env;

export const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: `${WALLET_CONNECT_ID}`,
  chains: [sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>{children}</RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
