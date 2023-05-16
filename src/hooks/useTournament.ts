import { useCallback, useEffect, useMemo, useState } from "react";
import { useSigner } from "wagmi";
import { TOURNAMENT_CONTRACT_ADDRESS } from "../constants/basics";
import { Tournament__factory } from "../types";
import { toast } from "react-toastify";
import { readonlyProvider } from "./network";
import { BigNumber } from "ethers";

const tokenContract = Tournament__factory.connect(
    TOURNAMENT_CONTRACT_ADDRESS,
    readonlyProvider
  );

export default function useTournament() {
  const { data: signer } = useSigner();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const tournamentContract = useMemo(() => {
    if (!signer) return undefined;
    return Tournament__factory.connect(TOURNAMENT_CONTRACT_ADDRESS, signer);
  }, [signer]);

  const enterTournament = useCallback(async () => {
    if (tournamentContract) {
      try {
        setLoading(true);
        const tx = await tournamentContract.enterTournament();
        await tx.wait();
      } catch (err: any) {
        setError(err.reason);
        toast.warn(err.reason);
      } finally {
        setLoading(false);
      }
    }
  }, [tournamentContract]);

  const endTournament = useCallback(
    async (winner1: string, winner2: string, winner3: string) => {
      if (tournamentContract) {
        try {
          setLoading(true);
          console.log("tournament: ", tournamentContract);
          const tx = await tournamentContract.endTournament(
            winner1,
            winner2,
            winner3
          );
          await tx.wait();
          toast.success("Tournament Ended");
        } catch (err: any) {
          setError(err.reason);
          toast.warn(err.reason);
        } finally {
          setLoading(false);
        }
      }
    },
    [tournamentContract]
  );

  return { loading, error, enterTournament, endTournament };
}

export const useTournamentMemberCount = () => {
  const [count, setCount] = useState<BigNumber>();
  const [tournamentId, setTournamentId] = useState<BigNumber>();

  useEffect(() => {
    setInterval(() => {
      (async () => {
        const _tournamentId = await tokenContract.tournamentId();
        const _count = await tokenContract.numPlayers(_tournamentId);
        setCount(_count);
        setTournamentId(_tournamentId);
      })();
    }, 5000);
  }, []);

  return { tournamentId, count };
};

export const useAlreadyEnteredInTournament = (address: string | undefined) => {

  const [entered, setEntered] = useState<boolean>(false);

  useEffect(() => {
    if (address) {
      setInterval(() => {
        (async () => {
          const _tournamentId = await tokenContract.tournamentId();
          const result = await tokenContract.isUserRegistered(
            _tournamentId,
            address
          );
          setEntered(result);
        })();
      }, 5000);
    }
  }, [address]);

  return entered;
};

export const useOwner = () => {
  const [owner, setOwner] = useState<string>();

  useEffect(() => {
    (async () => {
      const result = await tokenContract.owner();
      setOwner(result);
    })();
  }, []);

  return owner;
};
