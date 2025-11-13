import { useEffect, useState } from "react";

import { invokeGetStreak } from "../invocations";
import { Streak } from "../types";

export function useStreak() {
    const [streak, setStreak] = useState<Streak | null>(null);

    async function getStreak() {
        const streak = await invokeGetStreak()
        setStreak(streak)
    }

    useEffect(() => {
        getStreak();
        const id = setInterval(() => {
            getStreak();
        }, 1_000);

        return () => clearInterval(id);
    }, []);

    return {
        streak
    }
}