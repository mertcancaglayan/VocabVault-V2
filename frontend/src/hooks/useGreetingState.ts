import { useCallback, useState } from "react";

export function useGreetingState() {
	const [isGreeted, setIsGreeted] = useState(() => sessionStorage.getItem("greeted") === "true");

	const handleContinue = useCallback(() => {
		sessionStorage.setItem("greeted", "true");
		setIsGreeted(true);
	}, []);

	return { isGreeted, handleContinue };
}
