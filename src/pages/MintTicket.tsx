import { useState } from "react";
import { toast } from "react-toastify";
import useTicket from "../hooks/useTicket";
import { TOURNAMENT_CONTRACT_ADDRESS } from "../constants/basics";
import Spinner from "../components/Spinner";

export default function MintTicket() {
  const [amount, setAmount] = useState<number>(0);
  const { mintLoading, approveLoading, mintTicket, approveTicket } =
    useTicket();
  const onClick = () => {
    if (amount === 0) {
      toast.warn("Please input valid number");
      return;
    }
    mintTicket(amount);
  };

  const onApproveClick = () => {
    approveTicket(TOURNAMENT_CONTRACT_ADDRESS);
  };

  return (
    <div className="w-full flex flex-col gap-3 w-min-[500px]">
      <div className="flex flex-col gap-3 w-full">
        <label htmlFor="amount">Input your Amount</label>
        <input
          type="number"
          className="form-control bg-transparent border-[#3b3535] border-[1px] p-2 rounded-md"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      {mintLoading ? (
        <Spinner />
      ) : (
        <button className="bg-[#567] rounded-md p-3 w-full" onClick={onClick}>
          Mint Ticket
        </button>
      )}
      {approveLoading ? (
        <Spinner />
      ) : (
        <button
          className="bg-[#567] rounded-md p-3 w-full"
          onClick={onApproveClick}
        >
          Approve
        </button>
      )}
    </div>
  );
}
