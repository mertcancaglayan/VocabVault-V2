import { useContext, useEffect, useState } from "react"
import "./Toolbar.css"
import AppContext from "../../context/AppContext"

/**
 * Renders the admin toolbar with a search field, category filter, and an "Add New Word" button.
 *
 * The component debounces updates to the global search query (500ms) and keeps the global total
 * category count in sync with the provided categories collection.
 *
 * @returns The toolbar JSX element containing a search input, category filter select, and an add-new-word button.
 */
function Toolbar() {
    const [searchValue, setSearchValue] = useState<string>("")

    const contextValue = useContext(AppContext)
    if (!contextValue) throw new Error("Error");

    const { setIsEditModalOpen, setModalWord, setSearchQuery, categories, setTotalCategories } = contextValue

    function openModal() {
        setModalWord(undefined)
        setIsEditModalOpen(true)
    }

    useEffect(() => {
        setTotalCategories(Array.from(categories).length)
    }, [categories, setTotalCategories])

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(searchValue)
        }, 500)

        return () => clearTimeout(timer)
    }, [searchValue, setSearchValue, setSearchQuery])

    return (
        <div className="toolbar">
            <div className="toolbar-left">
                <div className="search-box">
                    <input type="text" onChange={(e) => setSearchValue(e.target.value)} placeholder="Search by word, ID, or category..." id="searchInput" />
                </div>
                <select className="filter-select" id="categoryFilter" onChange={(e) => setSearchValue(e.target.value)}>
                    <option value="">All Categories</option>
                    {Array.from(categories).map(([key, value]) => (
                        <option key={key} value={key}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>
            <button className="btn btn-primary" onClick={openModal}>
                ➕ Add New Word
            </button>

        </div>
    )
}

export default Toolbar