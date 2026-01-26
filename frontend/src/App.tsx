import { AppProvider } from "./context/AppContext"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import QuizFlowProvider from "./providers/QuizFlowProvider"
import { appRoutes } from "./AppRoutes"

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <QuizFlowProvider>
          <Routes>
            {appRoutes.map((item) => {
              return (
                <Route path={item.path} element={item.element}></Route>
              )
            })}
          </Routes>
        </QuizFlowProvider>
      </AppProvider>
    </BrowserRouter >
  )
}

export default App
