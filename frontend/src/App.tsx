import { useEffect, useState } from "react"
import { getCategoriesV2, getWords, type CategoryItem, type WordItem } from "./api/api"
import Home from "./pages/Home"

function App() {
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null)

  const [words, setWords] = useState<WordItem[]>([])

  useEffect(() => {
    getCategoriesV2()
      .then(data => setCategories(data[0].categories))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    if (!selectedCategory) return

    getWords(selectedCategory, "en", "tr")
      .then(data => setWords(data.words))
      .catch(err => console.error(err))
  }, [selectedCategory])

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
      <Home></Home>

    </>
  )
}

export default App
