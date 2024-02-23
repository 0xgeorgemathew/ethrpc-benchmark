import { ethers } from "ethers";

export const benchmarkGetPoolState = async (provider: ethers.Provider) => {
  const uniswapV3PoolAddress = "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640";
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

  const pool = new ethers.Contract(
    uniswapV3PoolAddress,
    uniswapV3PoolAbi,
    provider
  );
  const slot0 = await pool.slot0();
  // console.log(slot0);
};
