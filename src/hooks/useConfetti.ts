import { useEffect, useState } from "react";

import type { Streak } from "../types";

export function useConfetti(streak: Streak) {
    const [runConfetti, setRunConfetti] = useState(false);

    useEffect(() => {
        if (!streak) return;

        if (streak.streak_incremented === true) {
            setRunConfetti(true);

            setTimeout(() => {
                setRunConfetti(false);
            }, 10_000);

        }
    }, [streak?.streak_incremented])

    return {
        runConfetti
    }
}