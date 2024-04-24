"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import contractABI from "../../ABI/abi.json";
import { config } from "@/app/layout";
import { readContract } from "@wagmi/core";

const HomePage = () => {
  const [greeter, setGreeter] = useState<string>("");
  const [numbers, setNumbers] = useState<number[]>([]);

  // fetch greeter data
  const getGreeter = async () => {
    try {
      const response = await readContract(config, {
        abi: contractABI,
        address: "0x9CDc77007a4dcab71F81Eb0180c3e644C59A7eA7",
        functionName: "getGreeter",
      });

      setGreeter(response as string);
    } catch (e) {
      console.log(e);
    }
  };

  // fetch numbers data
  const getNumbers = async () => {
    try {
      const response = await readContract(config, {
        abi: contractABI,
        address: "0x9CDc77007a4dcab71F81Eb0180c3e644C59A7eA7",
        functionName: "getNumbers",
      });

      setNumbers(response as number[]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getGreeter();
    getNumbers();
  }, []);

  return (
    <div className="home-page">
      <ConnectButton></ConnectButton>
      <p>{greeter}</p>
      {numbers.map((number, idx) => (
        <span key={idx}>{number.toString()} </span>
      ))}
    </div>
  );
};

export default HomePage;
