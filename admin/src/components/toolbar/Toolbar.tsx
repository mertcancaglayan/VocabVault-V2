import { useEffect, useState } from "react"
import "./Toolbar.css"
import { useAppContext } from "../../hooks/useAppContext"

function Toolbar() {
    const [searchValue, setSearchValue] = useState<string>("")

    const contextValue = useAppContext()

    const { setIsEditModalOpen, setModalWord, setSearchQuery, categories, setTotalCategories } = contextValue

    function openModal() {
        setModalWord(undefined)
        setIsEditModalOpen(true)
    }

    useEffect(() => {
        setTotalCategories(Array.from(categories).length)
    }, [categories, setTotalCategories])


    return (
        <div className="toolbar">
            <div className="toolbar-left">
                <div className="search-box">
                    <input type="text" onChange={(e) => setSearchValue(e.target.value)} placeholder="Search by word, ID, or category..." id="searchInput" onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setSearchQuery(searchValue)
                        }
                    }} value={searchValue} />
                    <button className="search-btn" onClick={() => setSearchQuery(searchValue)}>Search <span>🔍</span></button>
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
