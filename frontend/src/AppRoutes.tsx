import FlashCards from "./pages/flashCards/FlashCards";
import Home from "./pages/Home";
import MatchingMode from "./pages/matching/MatchingMode";
import QuizPage from "./pages/quiz/QuizPage";
import Results from "./pages/results/Results";

export const appRoutes = [
    {
        path: "/",
        element: <Home />,
        name: "Home Page"
    }, {
        path: "/quiz",
        element: <QuizPage />,
        name: "Quiz Page"
    }, {
        path: "/results",
        element: <Results />,
        name: "Result Page"
    }, {
        path: "/wordMatching",
        element: <MatchingMode />,
        name: "Matching Page"
    }, {
        path: "/flashCards",
        element: <FlashCards />,
        name: "Flash Cards Page"
    }
]



