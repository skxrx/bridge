import { ethers, run } from "hardhat";

async function main() {
  const chainId = 4;
  const [validator] = await ethers.getSigners();

  const Bridge = await ethers.getContractFactory("Bridge");
  const Token = await ethers.getContractFactory("Token");

  const bridge = await Bridge.deploy(validator.address, chainId);
  await bridge.deployed();

  const token = await Token.deploy(bridge.address);
  await token.deployed();

  setTimeout(async function () {
    await run(`verify:verify`, {
      address: bridge.address,
      contract: "contracts/Bridge.sol:Bridge",
      constructorArguments: [validator.address, chainId],
    });
    await run(`verify:verify`, {
      address: token.address,
      contract: "contracts/Token.sol:Token",
      constructorArguments: [bridge.address],
    });
  }, 120000);

  console.log(`
    "Bridge" contract address: ${bridge.address}
    "Token" contract address: ${token.address}
  `);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
