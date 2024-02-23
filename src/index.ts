import { ethers } from "ethers";
import { config } from "dotenv";

config();

const FREE_RPC_URL = process.env.ALCHEMY_FREE_RPC_URL || "";
const PAID_RPC_URL = process.env.ALCHEMY_PAID_RPC_URL || "";

const benchmarkTxRequests = async (
  provider: ethers.Provider,
  blockNumber: number
) => {
  for (let i = blockNumber - 100; i < blockNumber; i++) {
    await provider.getBlock(i);
  }
};

const main = async () => {
  const freeProvider = new ethers.JsonRpcProvider(FREE_RPC_URL);
  const paidProvider = new ethers.JsonRpcProvider(PAID_RPC_URL);
  const localProvider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

  const blockNumber = await freeProvider.getBlockNumber();

  console.log("Starting benchmarks...");

  const startFree = Date.now();
  await benchmarkTxRequests(freeProvider, blockNumber);
  console.log(`Free tier: ${(Date.now() - startFree) / 1000} seconds`);

  const startPaid = Date.now();
  await benchmarkTxRequests(paidProvider, blockNumber);
  console.log(`Paid tier: ${(Date.now() - startPaid) / 1000} seconds`);

  const startLocal = Date.now();
  await benchmarkTxRequests(localProvider, blockNumber);
  console.log(`Local: ${(Date.now() - startLocal) / 1000} seconds`);
};

main().catch((error) => {
  console.error("Error running benchmarks:", error);
});
