import RegisterPageHeader from "@/components/RegisterPageHeader";
import { abi, contractAddress } from "@/constants";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAccount, useContractRead, useContractWrite } from "wagmi";

const register = () => {
  const router = useRouter();
  const domainName = router.query.domain;
  const { isDisconnected } = useAccount();

  const { data: price } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "price",
    args: [domainName],
  });

  const { write } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "register",
    args: [domainName],
    value: price,
    async onSuccess(data) {
      await new Promise((r) => setTimeout(r, 30000));
      alert("Domain registered successfully!");
      console.log(`https://mumbai.polygonscan.com/tx/${data.hash}`);
      router.replace(`/${domainName}`);
    },
    onError(err) {
      console.log("Error:", err);
    },
  });

  const handleSubmit = () => {
    if (isDisconnected) {
      alert("Wallet not connected");
      return;
    }
    write();
  };

  return (
    <main
      className={`min-h-screen box-border flex flex-col p-8 items-stretch gap-6 bg-gradient-to-tl from-[#f7f7f7] via-[#edf1f7] to-[#f7f7f7]`}
    >
      <Head>
        <title>Register on ENS</title>
      </Head>

      <header>
        <RegisterPageHeader />
      </header>

      <section className="w-full max-w-3xl overflow-hidden self-center flex flex-col justify-start gap-4">
        <div className="px-6 py-14 gap-6 max-w-3xl mx-0 my-auto flex flex-col items-center border border-solid border-[#E8E8E8] rounded-2xl bg-white">
          <h1 className="ms-0 me-0 w-full text-3xl font-bold leading-10">
            Register {domainName}.buddy
          </h1>

          <div className="flex items-center justify-center w-fit min-w-[10rem] max-w-max">
            <button
              disabled={isDisconnected}
              onClick={() => handleSubmit()}
              className="flex items-center justify-center bg-[#3888FF] text-white text-base rounded-lg font-bold leading-5 h-12 py-4 border-x border-y w-full hover:-translate-y-[1px]"
            >
              Register
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default register;
