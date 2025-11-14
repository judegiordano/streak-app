import { useEffect, useState } from "react";

import type { Streak } from "../types";

export function useConfetti(streak: Streak) {
    const [runConfetti, setRunConfetti] = useState(false);
    useEffect(() => {
        if (!streak) return;

        if (streak.streak_incremented) {
            setRunConfetti(true);

            const timeout = setTimeout(() => {
                setRunConfetti(false);
            }, 5_000);

            return () => clearTimeout(timeout);
        }
    }, [streak?.streak_incremented])

    return {
        runConfetti
    }
}