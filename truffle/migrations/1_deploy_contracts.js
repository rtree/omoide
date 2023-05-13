const OmoideStorage = artifacts.require("OmoideStorage");

module.exports = function(deployer) {
  deployer.deploy(OmoideStorage);
};