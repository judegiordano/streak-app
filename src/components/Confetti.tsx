import { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'
import { useWindowSize } from 'react-use'

import { useStreakStore } from '../stores/streak'

export function Confetti() {
	const { width, height } = useWindowSize()
	const [runConfetti, setRunConfetti] = useState(false)
	const streak = useStreakStore(store => store.streak)

	useEffect(() => {
		if (streak?.streak_incremented) {
			setRunConfetti(true)

			setTimeout(() => {
				setRunConfetti(false)
			}, 10_000)
		}
	}, [streak?.streak_incremented])

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
