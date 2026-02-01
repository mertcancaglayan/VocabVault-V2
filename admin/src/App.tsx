import { AppProvider } from './context/AppContext'
import AdminHomePage from './pages/AdminHomePage'

/**
 * Application root component that provides app context to the admin home page.
 *
 * @returns A JSX element containing `AppProvider` with `AdminHomePage` as its child.
 */
function App() {

  return (
    <AppProvider>
      <AdminHomePage></AdminHomePage>
    </AppProvider>
  )
}

export default App