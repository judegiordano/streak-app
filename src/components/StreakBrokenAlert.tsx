import { useEffect } from 'react'

import { cleanNumber } from '../helpers'
import { useStreakStore } from '../stores/streak'

export function StreakBrokenAlert() {
	const streak = useStreakStore(store => store.streak)
	const modalId = 'my_modal_2'

	useEffect(() => {
		if (streak?.streak_broken) {
			const modal = document.getElementById(modalId) as HTMLElement & { showModal: () => void }
			modal.showModal()
		}
	}, [streak?.streak_broken])

	if (!streak) return <></>

	return (
		<dialog id={modalId} className="modal">
			<div className="modal-box">
				<h3 className="font-bold text-lg">Oh no!</h3>
				<p className="py-2">you broke your streak of {cleanNumber(streak.streak)}...</p>
				<p className="py-2">{':('}</p>
				<div className="modal-action">
					<form method="dialog">
						<button className="btn">dismiss</button>
					</form>
				</div>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	)
}
