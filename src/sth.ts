import { ethers } from "ethers";

const url = "ws://localhost:8546";
const provider = new ethers.WebSocketProvider(url);

const getBlockNumber = async () => {
  const blockNumber = await provider.getBlockNumber();
  console.log("Current Block Number:", blockNumber);
};

getBlockNumber();
