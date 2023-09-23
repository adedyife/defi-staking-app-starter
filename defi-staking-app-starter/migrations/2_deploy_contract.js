
const Tether = artifacts.require("Tether")
const RWD = artifacts.require("RWD")
const DecentralBank = artifacts.require("DecentralBank")

module.exports = async function(deployer, network, account) {
   await deployer.deploy(Tether)
   await deployer.deploy(RWD)
   await deployer.deploy(DecentralBank)
}