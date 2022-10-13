const hre = require("hardhat");

async function main() {

  const factory  = await hre.ethers.getContractFactory("Bank");
  const contract = await factory.deploy();
  await contract.deployed();
  console.log(`Deployed at ${contract.address}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
