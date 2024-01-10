import { abi, web3GoDaddyAddress } from "@/constants";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount, useContract, useContractRead, useSigner } from "wagmi";

const DomainCard = ({ domain, id }) => {
  const { isConnected } = useAccount();
  const { data: signer } = useSigner();

  const [owner, setOwner] = useState(null);
  const [hasSold, setHasSold] = useState(false);

  const {
    data: ownerOf,
  } = useContractRead({
    abi: abi,
    address: web3GoDaddyAddress,
    functionName: "ownerOf",
    args: [id],
  });

  const contract = useContract({
    address: web3GoDaddyAddress,
    abi: abi,
    signerOrProvider: signer,
  });

  const handleBuy = async () => {
    if (!isConnected) {
      alert("Wallet Not connected. Please Connect Wallet");
      return;
    }
    try {
      console.log("Buying....");
      await contract.mint(id, { value: domain.cost });
      console.log("Bought");
      setHasSold(true);
    } catch (err) {
      console.log("This error", err);
    }
  };

  const getOwner = async () => {
    if (domain.isOwned || hasSold) {
      setOwner(ownerOf);
    }
  };

  useEffect(() => {
    getOwner();
  }, [hasSold, ownerOf]);

  return (
    <>
      {
        <div className="grid grid-cols-2 items-center h-14 w-screen max-w-3xl border border-black my-7 mx-auto pl-3">
          {/* Card Info */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium">
              {domain.isOwned || owner ? (
                <del>{domain.name}</del>
              ) : (
                <>{domain.name}</>
              )}
            </h3>

            {/* <p> */}
            {domain.isOwned || owner ? (
              <div className="flex flex-col items-center text-lg">
                <small>Owned by:</small>
                <span className="text-sm font-medium">
                  {owner && owner.slice(0, 6) + "..." + owner.slice(-4)}
                </span>
              </div>
            ) : (
              <div>
                <strong className="font-bold">
                  {ethers.utils.formatUnits(domain.cost.toString(), "ether")}{" "}
                </strong>
                ETH
              </div>
            )}
            {/* </p> */}
          </div>

          {!domain.isOwned && !owner && isConnected && (
            <button
              type="button"
              onClick={() => handleBuy()}
              className="w-[40%] bg-black text-white ml-auto cursor-pointer h-full font-semibold"
            >
              Buy
            </button>
          )}
        </div>
      }
    </>
  );
};

export default DomainCard;
