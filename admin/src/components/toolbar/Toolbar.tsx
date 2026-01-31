import { useContext, useEffect, useState } from "react"
import "./Toolbar.css"
import AppContext from "../../context/AppContext"

function Toolbar() {
    const [searchValue, setSearchValue] = useState<string>("")

    const contextValue = useContext(AppContext)
    if (!contextValue) throw new Error("Error");

    const { setIsEditModalOpen, setModalWord, setSearchQuery } = contextValue

    function openModal() {
        setModalWord(undefined)
        setIsEditModalOpen(true)
    }

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
            </div>
            <button className="btn btn-primary" onClick={openModal}>
                ➕ Add New Word
            </button>

        </div>
    )
}

export default Toolbar
