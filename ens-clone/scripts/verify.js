const { run, ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const contractAddress = "0x6c3FF820cd58bEaC96D6b47d0bf32bb3EFB40233";
  console.log("Verifying contract with deployer:", deployer.address);

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: ["buddy"],
    });
  } catch (err) {
    if (err.message.toLowerCase().includes("already verified")) {
      console.log("Already verified");
    } else {
      console.log(err);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
