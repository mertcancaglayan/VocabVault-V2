import { useContext } from "react"
import "./StatsGrid.css"
import AppContext from "../../context/AppContext"

/**
 * Render a three-card statistics grid using values from AppContext.
 *
 * Reads `totalFilteredWord` and `totalCategories` from `AppContext` and displays them alongside a static Languages count of `3`.
 *
 * @returns A JSX element containing the stats grid.
 * @throws Error if `AppContext` is not available.
 */
function StatsGrid() {
    const contextValue = useContext(AppContext)
    if (!contextValue) throw new Error("Error");

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