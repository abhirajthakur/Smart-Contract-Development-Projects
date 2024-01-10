import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

const Header = () => {
  return (
    <div className="flex flex-row items-center justify-between flex-grow h-12">
      <div>
        <Image src="/ens.svg" width={108} height={48} alt="ens.svg" />
      </div>
      <div className="flex text-base h-full items-center box-border">
        <ConnectButton />
      </div>
    </div>
  );
};

export default Header;
