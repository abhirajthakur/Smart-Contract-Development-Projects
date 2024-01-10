import RegisterPageHeader from "@/components/RegisterPageHeader";
import { abi, contractAddress } from "@/constants";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";

const index = () => {
  const router = useRouter();
  const domainName = router.query.domain;
  const [address, setAddress] = useState("");

  const { data: owner } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getDomainAddress",
    args: [domainName],
    onSuccess(domainOwner) {
      setAddress(domainOwner);
    },
  });

  useEffect(() => {
    setAddress(owner);
  }, [owner]);

  return (
    <main
      className={`min-h-screen box-border flex flex-col p-8 items-stretch gap-6 bg-gradient-to-tl from-[#f7f7f7] via-[#edf1f7] to-[#f7f7f7]`}
    >
      <Head>
        <title>{domainName}.buddy on ENS</title>
      </Head>

      <header>
        <RegisterPageHeader />
      </header>

      <section className="w-full max-w-3xl overflow-hidden self-center flex flex-col justify-start gap-4">
        <div className="min-h-[2rem] w-full py-0 px-3 self-center">
          <h2 className="m-0 p-0 w-full h-min text-3xl font-semibold">
            {domainName}.buddy
          </h2>
        </div>

        <div className="w-full pt-14 px-6 pb-6 bg-scroll bg-[100%_-9rem] bg-no-repeat gap-4 flex flex-col items-start justify-center border-[#E8E8E8] rounded-2xl bg-white bg-gradient-to-tl from-[#44BCF0] via-[#7298F8] to-[#A099FF]">
          <div className="rounded-full h-32 w-32 bg-gradient-to-br from-[#dc0c37] to-[#f379ba]"></div>
          <h1 className="m-0 w-full text-3xl font-semibold leading-10">
            {domainName}.buddy
          </h1>
        </div>

        <div className="border-[#E8E8E8] bg-white rounded-2xl">
          <div className="p-6 flex items-center gap-6">
            <p className="text-[#9B9BA6] ml-2 text-base font-bold">Address</p>

            <div className="flex flex-wrap gap-2 rounded-lg cursor-pointer w-fit h-10">
              <div className="flex items-center gap-1 px-2.5 py-3 bg-[#F5F5F5] border-x border-y border-[#E8E8E8] rounded-lg">
                <Image
                  src="/ethereum-logo.svg"
                  width={20}
                  height={20}
                  alt="Ethereum Logo"
                  className="flex flex-initial items-start"
                />

                <p className="text-[#262626] text-base font-medium">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default index;
