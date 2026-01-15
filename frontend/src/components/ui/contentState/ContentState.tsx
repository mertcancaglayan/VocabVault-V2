import type { ReactNode } from "react";
import Spinner from "../spinner/Spinner";
import { useNavigate } from "react-router-dom";

interface ContentStateProps {
    isLoading: boolean;
    error?: Error | null;
    isEmpty: boolean;
    children: ReactNode;
    loadingMsg: string;
}

function ContentState({ isLoading, error, isEmpty, children, loadingMsg }: ContentStateProps) {

    const navigateTo = useNavigate()

    function handleNavigate() {
        navigateTo("/")
    }

    if (isLoading) return <Spinner message={`Loading ${loadingMsg}...`}></Spinner>;
    if (error) return <p>Error loading {loadingMsg}: {error.message}</p>;
    if (isEmpty) return <>
        {loadingMsg === "categories" ? <p>No {loadingMsg} available</p> : <p>No {loadingMsg} available for this category.</p>}
        <button className="card-btn" onClick={handleNavigate}>Home</button>
    </>;

    return children
}

export default ContentState
