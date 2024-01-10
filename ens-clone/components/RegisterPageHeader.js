import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RegisterPageHeader = () => {
  return (
    <div className="flex flex-row items-center justify-between flex-grow h-12 gap-3">
      <div className="flex gap-3 items-center">
        <Link href="/">
          <Image
            src="/ens-logo.svg"
            width={48}
            height={48}
            alt="ens.svg"
            className="hover:-translate-y-[1px] hover:brightness-105 transition-all duration-150 ease-in-out"
          />
        </Link>

        <div className="ml-2 mr-24 w-80 flex items-center font-medium justify-start bg-white rounded-full border-x border-y text-[#262626] border-[#E8E8E8] overflow-hidden focus-within:border-[#6BA6FF]">
          <Image
            src="/search.svg"
            width={32}
            height={32}
            alt="Search Icon"
            className="pl-4 flex items-center justify-start font-bold"
          />
          <input
            type="search"
            placeholder="Search for a name"
            className="w-full h-full py-3 pl-4 pr-4 text-base text-[#262626] focus:border-[#cde1f4] outline-none font-medium bg-transparent leading-5"
            // onChange={(e) => handleInputChange(e)}
          />
        </div>
      </div>

      <div className="flex text-base h-full items-center box-border">
        <ConnectButton />
      </div>
    </div>
  );
};

export default RegisterPageHeader;
