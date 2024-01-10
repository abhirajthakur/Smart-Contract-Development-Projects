import { abi, contractAddress } from "@/constants";
import Link from "next/link";
import { useState } from "react";
import { zeroAddress } from "viem";
import { useContractRead } from "wagmi";

const DomainStatus = ({ domain }) => {
  const [isRegistered, setIsRegistered] = useState(false);

  const { data: tld, isFetched } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "topLevelDomain",
  });

  const { isFetching } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getDomainAddress",
    args: [domain],
    onSuccess(data) {
      setIsRegistered(data !== zeroAddress);
    },
  });

  return (
    isFetched &&
    (isRegistered ? (
      <Link
        href={`/${domain}`}
        className="max-w-[calc(29rem)] h-14 bg-[#fffefe] w-full object-center rounded-xl absolute mt-72 flex justify-between flex-grow items-center pr-5 pl-2 shadow-lg cursor-pointer"
      >
        <div className="pl-2 flex items-center gap-3.5">
          <div className="rounded-full h-8 w-8 bg-gradient-to-br from-[#87b7f6] via-[#c0d6f4] mr-2 to-[#e7edf8]"></div>
          <p className="text-base font-bold overflow-hidden w-72">
            {domain}.{tld}
          </p>
        </div>

        {isFetching ? (
          <div
            className="h-4 w-4 rounded-full animate-spin border-[3px] border-solid border-[#408dff] border-r-[#cce0ff]"
            role="status"
          />
        ) : domain.length < 3 ? (
          <p className="text-sm text-[#c93f2e] bg-[#f8e7e6] px-2 py-1 font-bold rounded-full">
            Too Short
          </p>
        ) : isRegistered ? (
          <p className="text-sm text-[#2cb48c] bg-[#e7f4ef] px-2 py-1 font-bold rounded-full">
            Registered
          </p>
        ) : (
          <p className="text-sm text-[#4993fc] bg-[#f1f7ff] px-2 py-1 font-bold rounded-full">
            Available
          </p>
        )}
      </Link>
    ) : (
      <Link
        href={`/${domain}/register`}
        className="max-w-[calc(29rem)] h-14 bg-[#fffefe] w-full object-center rounded-xl absolute mt-72 flex justify-between flex-grow items-center pr-5 pl-2 shadow-lg cursor-pointer"
      >
        <div className="pl-2 flex items-center gap-3.5">
          <div className="rounded-full h-8 w-8 bg-gradient-to-br from-[#87b7f6] via-[#c0d6f4] mr-2 to-[#e7edf8]"></div>
          <p className="text-base font-bold overflow-hidden w-72">
            {domain}.{tld}
          </p>
        </div>

        {isFetching ? (
          <div
            className="h-4 w-4 rounded-full animate-spin border-[3px] border-solid border-[#408dff] border-r-[#cce0ff]"
            role="status"
          />
        ) : domain.length < 3 ? (
          <p className="text-sm text-[#c93f2e] bg-[#f8e7e6] px-2 py-1 font-bold rounded-full">
            Too Short
          </p>
        ) : isRegistered ? (
          <p className="text-sm text-[#2cb48c] bg-[#e7f4ef] px-2 py-1 font-bold rounded-full">
            Registered
          </p>
        ) : (
          <p className="text-sm text-[#4993fc] bg-[#f1f7ff] px-2 py-1 font-bold rounded-full">
            Available
          </p>
        )}
      </Link>
    ))
  );
};

export default DomainStatus;
