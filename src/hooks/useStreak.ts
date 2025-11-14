import { useEffect } from 'react'

import { invokeGetStreak } from '../invocations'
import { useStreakStore } from '../stores/streak'

export function useStreak() {
	const setStreak = useStreakStore(state => state.setStreak)
	const streak = useStreakStore(state => state.streak)

	async function getStreak() {
		const streak = await invokeGetStreak()
		setStreak(streak)
	}

	useEffect(() => {
		getStreak()
		const id = setInterval(() => {
			getStreak()
		}, 1_000)

		return () => clearInterval(id)
	}, [])

	return {
		streak
	}
}
