import { abi, contractAddress } from "@/constants";
import { useContractRead } from "wagmi";
import DomainStatus from "./DomainStatus";

const SearchOutput = ({ domain, isDomainValid }) => {
  const { isFetched } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "topLevelDomain",
  });

  return isDomainValid ? (
    isFetched && <DomainStatus domain={domain} />
  ) : (
    <div className="border max-w-[calc(29rem)] h-14 bg-opacity-75 border-[#ff3232] bg-[#f8e7e6] w-full overflow-ellipsis rounded-xl absolute mt-72 flex justify-between flex-grow items-center pr-8 pl-2 shadow-lg">
      <p className="pl-2 text-base font-bold text-ellipsis">
        Invalid format for name
      </p>
    </div>
  );
};

export default SearchOutput;
