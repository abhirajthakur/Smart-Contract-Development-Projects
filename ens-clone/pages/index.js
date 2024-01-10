import Header from "@/components/Header";
import SearchOutput from "@/components/SearchOutput";
import localFont from "next/font/local";
import Head from "next/head";
import { useState } from "react";

const satoshi = localFont({
  src: "./Satoshi-Variable.woff2",
});

export default function Home() {
  const [domainName, setDomainName] = useState("");
  const [isDomainValid, setIsDomainValid] = useState(true);

  const handleInputChange = (e) => {
    const input = e.target.value.toLowerCase();
    const specialChars = /[`!@#%^&*\s()+_=\[\]{};':"\\|,.<>\/?~]/;
    const isInvalidString = specialChars.test(input);
    if (isInvalidString) {
      setIsDomainValid(false);
    } else {
      setIsDomainValid(true);
    }
    setDomainName(input);
  };

  return (
    <main
      className={`${satoshi.className} min-h-screen box-border flex flex-col p-8 items-stretch gap-6 bg-gradient-to-tl from-[#f7f7f7] via-[#edf1f7] to-[#f7f7f7]`}
    >
      <Head>
        <title>ENS</title>
      </Head>

      <header>
        <Header />
      </header>

      <section className="max-w-3xl w-full self-center flex flex-grow flex-col gap-4">
        <div className="flex flex-grow items-center w-full justify-center m-4">
          <div className="flex flex-col items-center justify-center gap-3">
            <h1 className="text-4xl font-extrabold bg-gradient-to-tl from-[#44bcf0fc] via-[#7298f8] to-[#a099ff] bg-clip-text text-transparent ">
              Your web3 username
            </h1>

            <div className="text-lg font-medium max-w-[calc(35rem)] leading-normal mb-3 text-center text-[#9B9BA6]">
              Your identity across web3, one name for all your crypto addresses,
              and your decentralised website.
            </div>

            <div className="border-[#E8E8E8] max-w-[calc(29rem)] w-full relative">
              <div className="flex gap-2 justify-start bg-white h-20 rounded-[20px] border-x border-y text-[#262626] border-[#E8E8E8] overflow-hidden focus-within:border-[#6BA6FF]">
                <input
                  type="search"
                  placeholder="Search for a name"
                  spellCheck="false"
                  maxLength="15"
                  className="placeholder:font-bold w-full h-full text-[#262626] focus:border-[#cde1f4] outline-none text-[1.625rem] pr-4 pl-6 font-medium bg-transparent leading-[2.125rem]"
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>

            {domainName.length !== 0 && (
              <SearchOutput domain={domainName} isDomainValid={isDomainValid} />
            )}
          </div>
        </div>
      </section>

      <footer></footer>
    </main>
  );
}
// http://ens-clone-abhirajthakur.vercel.app/