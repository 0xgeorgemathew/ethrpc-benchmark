import { ethers } from "ethers";
export const benchmarkBlockNumber = async (
  provider: ethers.Provider,
  blockNumber: number
) => {
  for (let i = blockNumber - 100; i < blockNumber; i++) {
    await provider.getBlock(i);
  }
};
