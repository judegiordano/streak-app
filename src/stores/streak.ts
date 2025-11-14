import { create } from 'zustand'

import type { Streak } from '../types'

interface StreakStore {
	streak: Streak | null
	setStreak: (streak: Streak) => void
}

export const useStreakStore = create<StreakStore>((set) => ({
	streak: null,
	setStreak: (streak: Streak) => set(() => ({ streak })),
}))
