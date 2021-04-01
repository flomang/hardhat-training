import hardhat from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { Contract, Signer } from "ethers";
import contractJson from "../artifacts/contracts/Delance.sol/Delance.json";


chai.use(solidity);
const { expect } = chai;
const { waffle } = hardhat;

describe("Delance", () => {
  let employer: Signer;
  let freelancer: Signer;
  let delance: Contract;

  beforeEach(async () => {
    let accounts = waffle.provider.getWallets();
    employer = accounts[0];
    freelancer = accounts[1];

    delance = await waffle.deployContract(employer, contractJson, [freelancer.getAddress(), 1617302513], {value: 3});
  });

  describe("deployment", async () => {
    it("should set contract price to 3", async () => {
      await expect(await delance.price()).to.eq(3);
    });
  });
});