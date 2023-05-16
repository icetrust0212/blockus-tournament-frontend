import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./header.css";
import { Link } from "react-router-dom";
import { useTokenBalance } from "../hooks/useToken";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { useTicketBalance } from "../hooks/useTicket";
import { useTournamentMemberCount } from "../hooks/useTournament";

const Header = () => {
  const { address } = useAccount();
  const tokenBalance = useTokenBalance(address);
  const ticketBalance = useTicketBalance(address);
  const { count, tournamentId } = useTournamentMemberCount();

  return (
    <header className="header-container w-full flex">
      <Link
        to={"/"}
        className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
      >
        Blockus Tournament {(tournamentId || 0).toString()}
      </Link>

      {address && tokenBalance && (
        <div className="mx-auto">
          USDC: {ethers.utils.formatEther(tokenBalance)}
        </div>
      )}

      {address && ticketBalance && (
        <div className="mx-auto">Ticket: {ticketBalance.toString()}</div>
      )}

      <div className="mx-auto">Members: {(count || 0).toString()}</div>

      <div className="header-connect-container">
        <ConnectButton showBalance={false} />
      </div>
    </header>
  );
};

export default Header;
