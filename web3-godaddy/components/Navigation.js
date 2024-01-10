import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { abi, web3GoDaddyAddress } from "@/constants";
import { useAccount, useContractRead } from "wagmi";
import { useEffect, useState } from "react";

const Navigation = () => {
  const [showListDomain, setShowListDomain] = useState(false);
  const { address } = useAccount();
  const { data: owner } = useContractRead({
    abi: abi,
    address: web3GoDaddyAddress,
    functionName: "owner",
  });

  useEffect(() => {
    setShowListDomain(owner == address);
  }, [address, showListDomain]);

  return (
    <nav className="flex items-center justify-between p-4">
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-1">
          <Image
            src="/ethereum_logo.svg"
            alt="Nothing"
            width={25}
            height={25}
          />
          <p className="font-bold text-xl">Web3 GoDaddy</p>
        </div>
        <div className="flex gap-7 -tracking-tighter">
          <Link href="/">Domain Names</Link>
          <Link href="/">Website & Hosting</Link>
          <Link href="/">Commerce</Link>
          <Link href="/">Email & Marketing</Link>
          {showListDomain && (
            <Link href="/list">List Domain</Link>
          )}
        </div>
      </div>
      <div>
        <ConnectButton
          showBalance={{
            smallScreen: false,
          }}
          chainStatus={{
            largeScreen: true,
          }}
        />
      </div>
    </nav>
  );
};

export default Navigation;
