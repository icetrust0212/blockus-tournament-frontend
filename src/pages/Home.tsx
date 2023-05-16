import useTournament, { useAlreadyEnteredInTournament } from "../hooks/useTournament";
import Spinner from "../components/Spinner";
import { useAccount } from "wagmi";

export default function Home() {
    const {loading, enterTournament} = useTournament();
    const {address} = useAccount();

    const entered = useAlreadyEnteredInTournament(address)

    const onClick = () => {
        enterTournament();
    }

    return (
        <div className="flex items-center flex-col gap-3">
            {
                entered && (
                    <h3 className="">You already entered</h3>
                )
            }
            <h4 className="">You need 10 USDC and 1 Ticket to enter Tournament</h4>
            {
                loading ? (
                    <Spinner />
                ) : (
                    <button className="bg-[#567] rounded-md p-3" onClick={onClick} disabled={entered}>Enter Tournament</button>
                )
            }
        </div>
    )
}