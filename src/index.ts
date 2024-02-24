import { ethers } from "ethers";
import { config } from "dotenv";
import { benchmarkGetPoolState } from "./benchmarkPoolState";
import { benchmarkBlockNumber } from "./benchmarkBlockNumber";
config();

const FREE_RPC_URL = process.env.FREE_RPC_URL || "";
const PAID_RPC_URL = process.env.PAID_RPC_URL || "";

// const benchmarkTxRequests = async (
//   provider: ethers.Provider,
//   blockNumber: number
// ) => {
//   for (let i = blockNumber - 100; i < blockNumber; i++) {
//     await provider.getBlock(i);
//   }
// };

const main = async () => {
  const freeProvider = new ethers.JsonRpcProvider(FREE_RPC_URL);
  const paidProvider = new ethers.JsonRpcProvider(PAID_RPC_URL);
  const localProvider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

  const blockNumber = await freeProvider.getBlockNumber();

  console.log("\n\nStarting BlockNumber benchmarks\n\n");
  try {
    const startFreeBlockNumber = Date.now();
    await benchmarkBlockNumber(freeProvider, blockNumber);
    console.log(
      `Free tier  : ${(Date.now() - startFreeBlockNumber) / 1000} seconds`
    );
  } catch (error) {
    console.log("Error in Free tier: ", error);
  }
  try {
    const startPaidBlockNumber = Date.now();
    await benchmarkBlockNumber(paidProvider, blockNumber);
    console.log(
      `Paid tier  : ${(Date.now() - startPaidBlockNumber) / 1000} seconds`
    );
  } catch (error) {
    console.log("Error in Paid tier: ", error);
  }
  try {
    const startLocalBlockNumber = Date.now();
    await benchmarkBlockNumber(localProvider, blockNumber);
    console.log(
      `Local Node : ${(Date.now() - startLocalBlockNumber) / 1000} seconds\n\n`
    );
  } catch (error) {
    console.log("Error in Local: ", error);
  }
  console.log("Starting pool state benchmarks");
  try {
    const startFreePoolState = Date.now();
    const averageTime = await benchmarkGetPoolState(freeProvider);

    console.log(
      `\n\nFree tier\n\nTotal time    : ${
        (Date.now() - startFreePoolState) / 1000
      } seconds`
    );
    console.log(`Average time  : ${averageTime.toFixed(4)} seconds`);
  } catch (error) {
    console.log("Error in Free tier: ", error);
  }
  try {
    const startPaidPoolState = Date.now();
    const averageTime = await benchmarkGetPoolState(paidProvider);
    console.log(
      `\n\nPaid tier\n\nTotal time    : ${
        (Date.now() - startPaidPoolState) / 1000
      } seconds`
    );
    console.log(`Average time  : ${averageTime.toFixed(4)} seconds`);
  } catch (error) {
    console.log("Error in Paid tier: ", error);
  }
  try {
    const startLocalPoolState = Date.now();
    const averageTime = await benchmarkGetPoolState(localProvider);
    console.log(
      `\n\nLocal Node\n\nTotal time    : ${
        (Date.now() - startLocalPoolState) / 1000
      } seconds`
    );
    console.log(`Average time  :${averageTime.toFixed(4)} seconds`);
  } catch (error) {
    console.log("Error in Local: ", error);
  }
};

main().catch((error) => {
  console.error("Error running benchmarks:", error);
});
