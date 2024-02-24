import { ethers } from "ethers";

export const benchmarkGetPoolState = async (provider: ethers.Provider) => {
  const uniswapV3PoolAddresses = [
    "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640",
    "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8",
    "0x4e68ccd3e89f51c3074ca5072bbac773960dfa36",
    "0xcbcdf9626bc03e24f779434178a73a0b4bad62ed",
    "0xc63b0708e2f7e69cb8a1df0e1389a98c35a76d52",
    "0x5777d92f208679db4b9778590fa3cab3ac9e2168",
    "0x109830a1aaad605bbf02a9dfa7b0b92ec2fb7daa",
    "0xa6cc3c2531fdaa6ae1a3ca84c2855806728693e8",
    "0xe8c6c9227491c0a8156a0106a0204d881bb7e531",
    "0x9db9e0e53058c89e5b94e29621a205198648425b",
  ];
  let totalTime = 0;
  const numCalls = uniswapV3PoolAddresses.length;
  const uniswapV3PoolAbi = [
    {
      inputs: [],
      name: "slot0",
      outputs: [
        { internalType: "uint160", name: "sqrtPriceX96", type: "uint160" },
        { internalType: "int24", name: "tick", type: "int24" },
        { internalType: "uint16", name: "observationIndex", type: "uint16" },
        {
          internalType: "uint16",
          name: "observationCardinality",
          type: "uint16",
        },
        {
          internalType: "uint16",
          name: "observationCardinalityNext",
          type: "uint16",
        },
        { internalType: "uint8", name: "feeProtocol", type: "uint8" },
        { internalType: "bool", name: "unlocked", type: "bool" },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  for (const uniswapV3PoolAddress of uniswapV3PoolAddresses) {
    const pool = new ethers.Contract(
      uniswapV3PoolAddress,
      uniswapV3PoolAbi,
      provider
    );
    const startTime = Date.now();
    await pool.slot0();
    const endTime = Date.now();

    totalTime += endTime - startTime;

    console.log(
      `Pool ${uniswapV3PoolAddress}: ${(endTime - startTime) / 1000} seconds`
    );

    // console.log(`Pool ${uniswapV3PoolAddress}:`, provider);
  }
  const averageTime = totalTime / numCalls / 1000;
  console.log(`Average time per call: ${averageTime} seconds`);
};
