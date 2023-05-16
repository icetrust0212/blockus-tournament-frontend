import { useState } from "react";
import useTournament from "../hooks/useTournament";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

export default function EndTournament() {
    const {loading, endTournament} = useTournament();
    const [winner1, setWinner1] = useState<string>();
    const [winner2, setWinner2] = useState<string>();
    const [winner3, setWinner3] = useState<string>();

    const onClick = () => {
        if (!winner1 || !winner2 || !winner3) {
            toast.warn('Winners should not be empty');
            return;
        }

        endTournament(winner1, winner2, winner3);
    }

    return (
        <div className="flex flex-col gap-3 w-[500px]">
            <div className="flex flex-col gap-3 w-full">
                <label htmlFor="winner1">Winner 1</label>
                <input type="text" className="form-control bg-transparent border-[#3b3535] border-[1px] p-2 rounded-md" value={winner1} onChange={e => setWinner1(e.target.value)} />
            </div>
            <div className="flex flex-col gap-3">
                <label htmlFor="winner2">Winner 2</label>
                <input type="text" className="form-control bg-transparent border-[#3b3535] border-[1px] p-2 rounded-md" value={winner2} onChange={e => setWinner2(e.target.value)} />
            </div>
            <div className="flex flex-col gap-3">
                <label htmlFor="winner3">Winner 3</label>
                <input type="text" className="form-control bg-transparent border-[#3b3535] border-[1px] p-2 rounded-md" value={winner3} onChange={e => setWinner3(e.target.value)} />
            </div>
            {
                loading ? (
                    <Spinner />
                ) : (
                    <button className="bg-[#567] rounded-md p-3 mt-4" onClick={onClick}>End Tournament</button>
                )
            }
        </div>
    )
}