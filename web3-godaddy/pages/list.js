import { useContract, useSigner } from "wagmi";
import { abi, web3GoDaddyAddress } from "@/constants";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Dna } from "react-loader-spinner";
import { ethers } from "ethers";
import { useNotification } from "@web3uikit/core";

const list = () => {
  const { data: signer } = useSigner();
  const [domain, setDomain] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useNotification();

  const [loading, setLoading] = useState(false);

  const contract = useContract({
    address: web3GoDaddyAddress,
    abi: abi,
    signerOrProvider: signer,
  });

  const handleNewNotification = () => {
    dispatch({
      type: "info",
      message: "Domain Listed Successfully",
      title: "Transaction Notification",
      position: "topR",
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (domain === "" || price === "") {
      alert("Please enter a domain and price");
      return;
    }
    setLoading(true);
    try {
      const tx = await contract.list(
        domain,
        ethers.utils.parseUnits(price, "ether")
      );
      await tx.wait();
      handleNewNotification(tx);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log(price);
    console.log(typeof price);
  }, [price]);

  return (
    <div className="max-h-screen overflow-hidden">
      <div className="mx-4 my-4 text-lg font-medium">
        <Link href="/">Back</Link>
      </div>
      <div className="flex flex-col items-center mt-36">
        <div className="text-5xl font-normal mb-3 w-auto tracking-wide">
          <h1>List a Domain</h1>
        </div>
        <form className="flex flex-col justify-center border-none">
          <input
            type="text"
            placeholder="Enter domain"
            className="h-14 text-3xl p-3 border-2 rounded-full mb-3"
            onChange={(e) => setDomain(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter cost in ETH"
            className="h-14 text-3xl p-3 border-2 rounded-full mb-5"
            onChange={(e) => setPrice(e.target.value)}
          />

          <div className="flex justify-center">
            {loading ? (
              <Dna visible={loading} height="80" width="80" />
            ) : (
              <input
                type="submit"
                disabled={loading}
                value="List Domain"
                className="border-2 border-blue-700 bg-slate-100 text-slate-600 hover:text-blue-700 hover:border-zinc-400 rounded-t-full rounded-b-full w-max text-3xl p-2"
                onClick={submitHandler}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default list;
