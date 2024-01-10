import Head from "next/head";
import DomainCard from "@/components/DomainCard";
import Navigation from "@/components/Navigation";
import Search from "@/components/Search";
import { abi, web3GoDaddyAddress } from "@/constants";
import { useEffect, useState } from "react";
import { useAccount, useContract, useContractRead, useProvider } from "wagmi";

export default function Home() {
  const { address } = useAccount();
  const [domains, setDomains] = useState([]);
  const provider = useProvider();

  const contract = useContract({
    address: web3GoDaddyAddress,
    abi: abi,
    signerOrProvider: provider,
  });

  const { data: maxSupply } = useContractRead({
    abi: abi,
    address: web3GoDaddyAddress,
    functionName: "maxSupply",
  });

  const loadBlockchainData = async () => {
    let domains = [];
    for (let i = 0; i < maxSupply; i++) {
      const domain = await contract.getDomain(i);
      domains.push(domain);
    }
    setDomains(domains);
  };

  useEffect(() => {
    async function load() {
      await loadBlockchainData();
    }
    load();
  }, [address, maxSupply]);

  return (
    <>
      <Head>
        <title>Web3 GoDaddy</title>
        <meta name="description" content="Web3 GoDaddy to buy domains" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navigation />
        <Search />
        <div className="flex flex-col items-center ">
          <h1 className="text-3xl font-bold mt-5 p-2">
            Why do you need a domain name?
          </h1>
          <p>
            Own your custom username, use it across services, and be able to
            store avatar and other profile data
          </p>
          <div className="bg-black h-0.5 w-screen max-w-4xl"></div>
          <div className="flex justify-center">
            <div className="flex flex-col">
              {domains.map((domain, index) => (
                <DomainCard key={index} domain={domain} id={index} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
