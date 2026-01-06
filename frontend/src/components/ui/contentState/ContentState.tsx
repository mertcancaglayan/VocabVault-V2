import type { ReactNode } from "react";
import Spinner from "../spinner/Spinner";
import { useNavigate } from "react-router-dom";

interface ContentStateProps {
    isLoading: boolean;
    error?: Error | null;
    isEmpty: boolean;
    children: ReactNode;
}

function ContentState({ isLoading, error, isEmpty, children }: ContentStateProps) {

    const navigateTo = useNavigate()

    function handleNavigate() {
        navigateTo("/")
    }

    if (isLoading) return <Spinner message={"Loading questions..."}></Spinner>;
    if (error) return <p>Error loading quiz: {error.message}</p>;
    if (isEmpty) return <>
        <p>No questions available for this category.</p>
        <button className="card-btn" onClick={handleNavigate}>Home</button>
    </>;

    return children
}

export default ContentState
