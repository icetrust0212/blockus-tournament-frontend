import { ethers } from "ethers";
import { RPC_URL } from "../constants/basics";

export const readonlyProvider = new ethers.providers.StaticJsonRpcProvider(
  RPC_URL
);
