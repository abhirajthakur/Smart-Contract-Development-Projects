const { ethers } = require("hardhat");

const tld = "buddy";

async function main() {
  const domainContract = await ethers.deployContract("Domains", [tld]);
  await domainContract.waitForDeployment();

  console.log(`Domains deployed to: ${domainContract.target}`);

  const price = await domainContract.price("myname");
  const txn = await domainContract.register("myname", {
    value: price,
  });
  await txn.wait();

  const tokenURI = await domainContract.tokenURI(0);
  console.log(`Token URI: ${tokenURI}`);
}

// 0x6c3FF820cd58bEaC96D6b47d0bf32bb3EFB40233
// https://mumbai.polygonscan.com/address/0x6c3FF820cd58bEaC96D6b47d0bf32bb3EFB40233#code

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
