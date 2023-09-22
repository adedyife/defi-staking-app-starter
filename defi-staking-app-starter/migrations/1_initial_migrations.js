// const Migrations = artifacts.require(Migrations)

// module.exports = function deployer() {
//     deployer.deploy(Migrations)
// }
const Migrations = artifacts.require("Migrations"); // Replace with the correct contract name

module.exports = function (deployer) {
  deployer.deploy(Migrations);
}