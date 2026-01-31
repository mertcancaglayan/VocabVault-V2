import { useContext } from "react"
import "./Toolbar.css"
import AppContext from "../../context/AppContext"

function Toolbar() {
    const contextValue = useContext(AppContext)
    if (!contextValue) throw new Error("Error");

    const { setIsEditModalOpen,setModalWord } = contextValue

    function openModal() {
        setModalWord(undefined)
        setIsEditModalOpen(true)
    }

    return (
        <div className="toolbar">
            <div className="toolbar-left">
                <div className="search-box">
                    <input type="text" placeholder="Search by word, ID, or category..." id="searchInput" />
                </div>
                <select className="filter-select" id="levelFilter">
                    <option value="">All Levels</option>
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                </select>
                <select className="filter-select" id="categoryFilter">
                    <option value="">All Categories</option>
                    <option value="human_life">Human Life</option>
                    <option value="nature">Nature</option>
                    <option value="technology">Technology</option>
                </select>
            </div>
            <button className="btn btn-primary" onClick={openModal}>
                ➕ Add New Word
            </button>

        </div>
    )
}

export default Toolbar
