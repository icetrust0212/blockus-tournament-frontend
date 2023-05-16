import { useCallback, useMemo, useState, useEffect } from "react";
import { useSigner } from "wagmi";
import { ERC20_ADDRESS } from "../constants/basics";
import { ERC20__factory } from "../types";
import { toast } from "react-toastify";
import { BigNumber } from "ethers";
import { readonlyProvider } from "./network";
const tokenContract = ERC20__factory.connect(ERC20_ADDRESS, readonlyProvider);

export default function useToken() {
  const { data: signer } = useSigner();
  const [loading, setLoading] = useState<boolean>(false);
  const [approveLoading, setApproveLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const tokenContract = useMemo(() => {
    if (!signer) return undefined;
    return ERC20__factory.connect(ERC20_ADDRESS, signer);
  }, [signer]);

  const mintToken = useCallback(
    async (amount: BigNumber) => {
      if (tokenContract) {
        try {
          setLoading(true);
          const tx = await tokenContract.mint(amount);
          await tx.wait();
          toast.success("Successfully minted");
        } catch (err: any) {
          setError(err.reason);
          toast.warn(err.reason);
        } finally {
          setLoading(false);
        }
      }
    },
    [tokenContract]
  );

  const approveToken = useCallback(
    async (spender: string, amount: BigNumber) => {
      if (tokenContract) {
        try {
          setApproveLoading(true);
          const tx = await tokenContract.approve(spender, amount);
          await tx.wait();
          toast.success("Successfully approved");
        } catch (err: any) {
          setError(err.reason);
          toast.warn(err.reason);
        } finally {
          setApproveLoading(false);
        }
      }
    },
    [tokenContract]
  );

  return {
    mintLoading: loading,
    approveLoading,
    error,
    mintToken,
    approveToken,
  };
}

export const useTokenBalance = (address: string | undefined) => {

  const [balance, setBalance] = useState<BigNumber>();

  useEffect(() => {
    if (address) {
      setInterval(() => {
        (async () => {
          const _balance = await tokenContract.balanceOf(address);
          setBalance(_balance);
        })();
      }, 5000);
    }
  }, [address]);

  return balance;
};
