import { task } from "hardhat/config";

import { bridgeAddress } from "../config";

task("swap", "Swap your tokens to another chain")
  .addParam("receiver", "Receiver address on another chain")
  .addParam("tokenAddress", "Token address in this chain")
  .addParam("amount", "How many tokens")
  .addParam("chainTo", "On which chain send tokens?")
  .addParam("nonce", "Your nonce")
  .setAction(async function (taskArgs, hre) {
    const bridge = await hre.ethers.getContractAt("Bridge", bridgeAddress);

    await bridge.swap(
      taskArgs.receiver,
      taskArgs.tokenAddress,
      taskArgs.amount,
      taskArgs.chainTo,
      taskArgs.nonce
    );
  });

task("redeem", "Take your tokens")
  .addParam("receiver", "Receiver address on another chain")
  .addParam("token", "Token address in this chain")
  .addParam("amount", "Amount of tokens")
  .addParam("nonce", "Your nonce")
  .addParam("chainTo", "This chainId")
  .addParam("v", "v part of signature")
  .addParam("r", "r part of signature")
  .addParam("s", "s part of signature")
  .setAction(async function (taskArgs, hre) {
    const bridge = await hre.ethers.getContractAt("Bridge", bridgeAddress);

    await bridge.redeem(
      taskArgs.receiver,
      taskArgs.token,
      taskArgs.amount,
      taskArgs.nonce,
      taskArgs.chainTo,
      taskArgs.v,
      taskArgs.r,
      taskArgs.s
    );
  });
