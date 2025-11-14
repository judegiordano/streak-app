import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";

import { useConfetti } from "../hooks/useConfetti";
import type { Streak } from "../types";

export function Confetti({ streak }: { streak: Streak }) {
    const { width, height } = useWindowSize()
    const { runConfetti } = useConfetti(streak)

    if (!runConfetti) return
    return (
        <ReactConfetti
            numberOfPieces={1_000}
            recycle={false}
            width={width}
            height={height}
        />
    )
}