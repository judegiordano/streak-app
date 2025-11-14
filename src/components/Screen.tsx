import React from 'react'

export function Screen({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col justify-center items-center w-screen h-screen text-center">
			{children}
		</div>
	)
}
