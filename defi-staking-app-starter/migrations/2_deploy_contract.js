import DecentralBank from "../src/truffle_abis/DecentralBank.json";
const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function(deployer, network, accounts) {
  // deploy contracts
  await deployer.deploy(Tether);
  const tether = await Tether.deployed();

  await deployer.deploy(RWD);
  const rwd = await RWD.deployed();
  await deployer.deploy(DecentralBank, rwd.address, tether.address);
  const Decentralbank = await DecentralBank.deployed();

  // transfer all RWD tokens to DecentralBank
  await rwd.transfer(Decentralbank.address, "1000000000000000000000000");

  // distribute 100 tether to investors
  tether.transfer(accounts[1], "100000000000000000000");
};
