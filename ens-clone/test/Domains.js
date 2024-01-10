const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Domains", function () {
  let domains;
  let owner, addr1, addr2;

  beforeEach(async function () {
    domains = await ethers.deployContract("Domains", ["buddy"]);
    await domains.waitForDeployment();

    [owner, addr1, addr2] = await ethers.getSigners();
  });

  describe("register", function () {
    it("should register a domain", async function () {
      await domains
        .connect(addr1)
        .register("example", { value: ethers.parseEther("1") });
      expect(await domains.getDomainAddress("example")).to.equal(addr1.address);
    });

    it("should not register a domain that is already registered", async function () {
      await domains
        .connect(addr1)
        .register("example", { value: ethers.parseEther("1") });
      await expect(
        domains
          .connect(addr2)
          .register("example", { value: ethers.parseEther("2") })
      ).to.be.revertedWithCustomError(domains, "Domains__DomainNotAvailable");
    });

    it("should not register a domain with an invalid name", async function () {
      await expect(
        domains.connect(addr1).register("", { value: ethers.parseEther("1") })
      ).to.be.revertedWithCustomError(domains, "Domains__InvalidName");
      await expect(
        domains.connect(addr1).register("a", { value: ethers.parseEther("1") })
      ).to.be.revertedWithCustomError(domains, "Domains__InvalidName");
      await expect(
        domains.connect(addr1).register("abcdefghijklmnopqrstuvwxyz", {
          value: ethers.parseEther("0.1"),
        })
      ).to.be.revertedWithCustomError(domains, "Domains__InvalidName");
    });

    it("should not register a domain with insufficient funds", async function () {
      await expect(
        domains
          .connect(addr1)
          .register("example", { value: ethers.parseEther("0.05") })
      ).to.be.revertedWithCustomError(domains, "Domains__NotEnoughMoney");
    });
  });

  describe("withdraw", function () {
    it("should withdraw the contract balance", async function () {
      const initialBalance = await ethers.provider.getBalance(owner.address);
      await domains
        .connect(addr1)
        .register("example", { value: ethers.parseEther("10") });
      await domains.withdraw();
      const finalBalance = await ethers.provider.getBalance(owner.address);
      expect(finalBalance).to.be.gt(initialBalance);
    });

    it("should only be callable by the contract owner", async function () {
      await expect(domains.connect(addr1).withdraw()).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });

  describe("getDomainAddress", function () {
    it("should return the domain owner's address", async function () {
      await domains
        .connect(addr1)
        .register("example", { value: ethers.parseEther("1") });
      expect(await domains.getDomainAddress("example")).to.equal(addr1.address);
    });
  });

  describe("price", function () {
    it("should return the correct price for a domain name", async function () {
      expect(await domains.price("a")).to.equal(
        ethers.parseUnits("0.1", "ether")
      );
      expect(await domains.price("abcdef")).to.equal(
        ethers.parseUnits("0.3", "ether")
      );
      expect(await domains.price("abcdefghij")).to.equal(
        ethers.parseUnits("0.5", "ether")
      );
      expect(await domains.price("abcdefghijklmno")).to.equal(
        ethers.parseUnits("0.5", "ether")
      );
    });

    it("should revert if the domain name is empty", async function () {
      await expect(domains.price("")).to.be.revertedWithCustomError(
        domains,
        "Domains__StringCannotBeEmpty"
      );
    });
  });
});
