import { useContext } from "react"
import "./StatsGrid.css"
import AppContext from "../../context/AppContext"

function StatsGrid() {
    const contextValue = useContext(AppContext)
    if (!contextValue) throw new Error("Error");

    const { totalFilteredWord } = contextValue

    return (
        <div className="stats-grid">
            <div className="stat-card">
                <div className="stat-value">{totalFilteredWord}</div>
                <div className="stat-label">Total Words</div>
            </div>
            <div className="stat-card">
                <div className="stat-value">12</div>
                <div className="stat-label">Categories</div>
            </div>
            <div className="stat-card">
                <div className="stat-value">3</div>
                <div className="stat-label">Languages</div>
            </div>
            <div className="stat-card">
                <div className="stat-value">89</div>
                <div className="stat-label">A1 Level</div>
            </div>
        </div>
    )
}

export default StatsGrid
