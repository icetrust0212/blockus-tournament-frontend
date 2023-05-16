import {useCallback, useEffect, useMemo, useState} from 'react';
import { useSigner } from 'wagmi';
import { TICKET_ADDRESS } from '../constants/basics';
import { Ticket__factory } from '../types';
import { toast } from 'react-toastify';
import { BigNumber } from 'ethers';
import { readonlyProvider } from './network';
const tokenContract = Ticket__factory.connect(TICKET_ADDRESS, readonlyProvider);

export default function useTicket() {
    const {data: signer} = useSigner();
    const [loading, setLoading] = useState<boolean>(false);
    const [approveLoading, setApproveLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>();

    const ticketContract = useMemo(() => {
        if (!signer) return undefined;
        return Ticket__factory.connect(
          TICKET_ADDRESS,
          signer
        );
      }, [signer]);

    const mintTicket = useCallback(async (amount: number) => {
        if (ticketContract) {
            try {
                setLoading(true);
                const tx = await ticketContract.mint(amount);
                await tx.wait();
                toast.success('Successfully minted');
            } catch (err: any) {
                setError(err.reason);
                toast.warn(err.reason);
            } finally {
                setLoading(false);
            }
        }
    }, [ticketContract]);

    const approveTicket = useCallback(async (spender: string) => {
        if (ticketContract) {
            try {
                setApproveLoading(true);
                const tx = await ticketContract.setApprovalForAll(spender, true);
                await tx.wait();
                toast.success('Successfully approved');
            } catch (err: any) {
                setError(err.reason);
                toast.warn(err.reason);
            } finally {
                setApproveLoading(false);
            }
        }
    }, [ticketContract]);

    return {mintLoading: loading, approveLoading, error, mintTicket, approveTicket}
}

export const useTicketBalance = (address: string | undefined) => {
  
    const [balance, setBalance] = useState<BigNumber>();
  
    useEffect(() => {
      if (address) {
        setInterval(() => {
          (async () => {
            const _balance = await tokenContract.balanceOf(address, 0);
            setBalance(_balance);
          })();
        }, 5000);
      }
    }, [address]);
  
    return balance;
  };