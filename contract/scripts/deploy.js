// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const message = "Inmessenger"
 
  const lock = await hre.ethers.deployContract("Message", [message]);
  await lock.waitForDeployment();

  console.log(`successfully ${lock.target}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});