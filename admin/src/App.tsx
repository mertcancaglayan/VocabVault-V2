import { AppProvider } from './context/AppContext'
import AdminHomePage from './pages/AdminHomePage'

function App() {

  return (
    <AppProvider>
      <AdminHomePage></AdminHomePage>
    </AppProvider>
  )
}

export default App
