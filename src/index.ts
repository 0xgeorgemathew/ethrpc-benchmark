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
  console.log("BlockNumber Free: ", blockNumber);
  const blockNumberPaid = await paidProvider.getBlockNumber();
  console.log("BlockNumber Paid: ", blockNumberPaid);
  const blockNumberLocal = await localProvider.getBlockNumber();
  console.log("BlockNumber Local: ", blockNumberLocal);

  console.log("Starting BlockNumber benchmarks");

  const startFreeBlockNumber = Date.now();
  await benchmarkBlockNumber(freeProvider, blockNumber);
  console.log(
    `Free tier: ${(Date.now() - startFreeBlockNumber) / 1000} seconds`
  );

  const startPaidBlockNumber = Date.now();
  await benchmarkBlockNumber(paidProvider, blockNumber);
  console.log(
    `Paid tier: ${(Date.now() - startPaidBlockNumber) / 1000} seconds`
  );

  const startLocalBlockNumber = Date.now();
  await benchmarkBlockNumber(localProvider, blockNumber);
  console.log(`Local: ${(Date.now() - startLocalBlockNumber) / 1000} seconds`);

  console.log("Starting pool state benchmarks");

  const startFreePoolState = Date.now();
  for (let i = 0; i < 10; i++) {
    await benchmarkGetPoolState(freeProvider);
  }
  console.log(
    `Free tier: ${(Date.now() - startFreePoolState) / 10000} seconds`
  );

  const startPaidPoolState = Date.now();
  for (let i = 0; i < 10; i++) {
    await benchmarkGetPoolState(paidProvider);
  }
  console.log(
    `Paid tier: ${(Date.now() - startPaidPoolState) / 10000} seconds`
  );

  const startLocalPoolState = Date.now();
  for (let i = 0; i < 10; i++) {
    await benchmarkGetPoolState(localProvider);
  }
  console.log(`Local: ${(Date.now() - startLocalPoolState) / 10000} seconds`);
};

main().catch((error) => {
  console.error("Error running benchmarks:", error);
});
