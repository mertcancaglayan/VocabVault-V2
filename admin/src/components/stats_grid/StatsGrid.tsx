import "./StatsGrid.css"
import { useAppContext } from "../../hooks/useAppContext"

function StatsGrid() {
    const contextValue = useAppContext()
    const { totalFilteredWord, totalCategories } = contextValue

    return (
        <div className="stats-grid">
            <div className="stat-card">
                <div className="stat-value">{totalFilteredWord}</div>
                <div className="stat-label">Total Words</div>
            </div>
            <div className="stat-card">
                <div className="stat-value">{totalCategories}</div>
                <div className="stat-label">Categories</div>
            </div>
            <div className="stat-card">
                <div className="stat-value">3</div>
                <div className="stat-label">Languages</div>
            </div>
        </div>
    )
}

export default StatsGrid
