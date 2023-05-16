import { ethers } from "ethers";
import { readonlyProvider } from "./network";

export const getMaticBalance = (address: string) =>
  new Promise<number>(async (resolve) => {
    try {
      const balanceInWei = await readonlyProvider.getBalance(address);
      const balance = parseFloat(ethers.utils.formatEther(balanceInWei));
      resolve(balance);
    } catch (error) {
      console.error("[getMaticBalance] ", error);
      resolve(0);
    }
  });
