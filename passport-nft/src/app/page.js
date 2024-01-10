"use client";

import { CreatePassport } from "@/components/CreatePassport";
import { Passport } from "@/components/Passport";
import {
  PASSPORT_RESOLVER_ABI,
  PASSPORT_RESOLVER_CONTRACT_ADDRESS,
} from "@/constants";
import { useState, useEffect } from "react";
import { useAccount, useContractRead } from "wagmi";

export default function Home() {
  const [hasMinted, setHasMinted] = useState(false);
  const { isDisconnected, address, isConnected } = useAccount();

  const { data: passportInfo } = useContractRead({
    address: PASSPORT_RESOLVER_CONTRACT_ADDRESS,
    abi: PASSPORT_RESOLVER_ABI,
    functionName: "getPassport",
    account: address,
    onSettled(data, error) {
      console.log({ data, error });
      if (data) {
        setHasMinted(true);
      } else {
        setHasMinted(false);
      }
    },
  });

  useEffect(() => {
    if (!passportInfo) {
      setHasMinted(false);
    } else {
      setHasMinted(true);
    }
  }, [passportInfo]);

  return (
    <div>
      {/* <main className="flex min-h-screen flex-col items-center justify-between p-12"> */}
      <main className="px-8 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
        {hasMinted ? <Passport /> : <CreatePassport />}
      </main>
    </div>
  );
}
