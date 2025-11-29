
import Home from "./pages/Home"
import { AppProvider } from "./context/AppContext"

function App() {


  // const [words, setWords] = useState<WordItem[]>([])


  // useEffect(() => {
  //   if (!selectedCategory) return

  //   getWords(selectedCategory, "en", "tr")
  //     .then(data => setWords(data.words))
  //     .catch(err => console.error(err))
  // }, [selectedCategory])

  return (
    <>
      {/* <h2>Categories</h2>
      <ul>
        {categories.map((e) => (
          <li key={e.key}>
            <button onClick={() => setSelectedCategory(e)}>
              {e.label}
            </button>
          </li>
        ))}
      </ul>

      <h2>Words</h2>
      <ul>
        {words.map((word) => (
          <li key={word.id}>{word.from} → {word.to}</li>
        ))}
      </ul> */}
      <AppProvider>
          
        <Home></Home>
      </AppProvider>

    </>
  )
}

export default App
