"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { MouseEvent, useEffect, useState } from "react";
import contractABI from "../../ABI/abi.json";
import { config } from "@/app/layout";
import {
  readContract,
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";

const HomePage = () => {
  const [greeter, setGreeter] = useState("");
  const [numbers, setNumbers] = useState<number[]>([]);
  const [newGreeter, setNewGreeter] = useState("");

  // fetch greeter data
  const getGreeter = async () => {
    try {
      const response = await readContract(config, {
        abi: contractABI,
        address: "0xB503517d42705102C17E51c25353880c04bbA05f",
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
        address: "0xB503517d42705102C17E51c25353880c04bbA05f",
        functionName: "getNumbers",
      });

      setNumbers(response as number[]);
    } catch (e) {
      console.log(e);
    }
  };

  // edit greeter
  const editGreeter = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const { request } = await simulateContract(config, {
        abi: contractABI,
        address: "0xB503517d42705102C17E51c25353880c04bbA05f",
        functionName: "setGreeter",
        args: [newGreeter],
      });

      const hash = await writeContract(config, request);

      await waitForTransactionReceipt(config, { hash });

      alert("Greeter updated!");
      window.location.reload();
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
      <form>
        <p>Update Greeting: </p>
        <input
          className="border border-black"
          onChange={(e) => {
            setNewGreeter(e.target.value);
          }}
          type="text"
        />
        <button className="border border-black" onClick={editGreeter}>
          Change
        </button>
      </form>
      {numbers.map((number, idx) => (
        <span key={idx}>{number.toString()} </span>
      ))}
    </div>
  );
};

export default HomePage;
