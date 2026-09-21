import { useEffect, useState } from "react"

export function useDelayedUnmount(isVisible, delayMs) {
	const [shouldRender, setShouldRender] = useState(isVisible)

	useEffect(() => {
		let timer
		if (isVisible) {
			setShouldRender(true)
		} else {
			timer = setTimeout(() => setShouldRender(false), delayMs)
		}
		return () => clearTimeout(timer)
	}, [isVisible, delayMs])

	return shouldRender
}