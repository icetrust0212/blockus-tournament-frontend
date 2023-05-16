import React from "react";
import { Link } from "react-router-dom";
import { useOwner } from "../hooks/useTournament";
import { useAccount } from "wagmi";

const Footer = () => {
  const owner = useOwner();
  const { address } = useAccount();
  return (
    <footer className="w-full">
      <div className="flex mb-32 w-full text-center lg:mb-0 lg:grid-cols-4 justify-between">
        <Link
          to="/mint-usdc"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Cryptocurrency{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 text-sm opacity-50`}>
            Mint USDC to enter in Tournament
          </p>
        </Link>

        <Link
          to="mint-ticket"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Ticket{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 text-sm opacity-50`}>
            Mint ERC1155 NFT to enter in Tournament
          </p>
        </Link>

        {address && owner === address && (
          <Link
            to="/end-tournament"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              End Tournament{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 text-sm opacity-50`}>Enjoy!</p>
          </Link>
        )}
      </div>
    </footer>
  );
};

export default Footer;
