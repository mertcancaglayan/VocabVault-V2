import { useContext, useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

interface Props {
    children: ReactNode;
}

const GAME_ROUTES = [
    "/quiz",
    "/results",
    "/wordMatching",
    "/flashCards"
];
function QuizFlowProvider({ children }: Props) {
    const location = useLocation();
    const prevPath = useRef<string | null>(null);

    const contextValue = useContext(AppContext);
    if (!contextValue) {
        throw new Error("Home must be used within AppProvider");
    }

    const { setResults, setCurrentSlideIndex } = contextValue;

    useEffect(() => {
        const currentPath = location.pathname;
        const previousPath = prevPath.current;

        const enteredGame =
            GAME_ROUTES.includes(currentPath) &&
            !GAME_ROUTES.includes(previousPath ?? "");

        const leftGame =
            !GAME_ROUTES.includes(currentPath) &&
            GAME_ROUTES.includes(previousPath ?? "");

        const isRetry = location.state?.intent === "retry";

        if (enteredGame || leftGame || isRetry) {
            setResults([]);
            setCurrentSlideIndex(0);
        };

        prevPath.current = currentPath

    }, [location.pathname, location.key, setResults, setCurrentSlideIndex, location.state?.intent]);

    return children;
}

export default QuizFlowProvider

