import Home from "./pages/Home"
import { AppProvider } from "./context/AppContext"
import QuizPage from "./pages/quiz/QuizPage"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Results from "./pages/results/Results"
import MatchingMode from "./pages/matching/MatchingMode"
import FlashCards from "./pages/flashCards/FlashCards"

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/quiz" element={<QuizPage />}></Route>
          <Route path="/results" element={<Results />}></Route>
          <Route path="/wordMatching" element={<MatchingMode />}></Route>
          <Route path="/flashCards" element={<FlashCards />}></Route>
        </Routes>
      </AppProvider>
    </BrowserRouter >
  )
}

export default App
