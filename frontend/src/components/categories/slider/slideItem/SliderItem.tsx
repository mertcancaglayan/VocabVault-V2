import { useContext } from "react";
import AppContext from "../../../../context/AppContext";
import { type Subcategory } from "../../../../api/api";
import "../slideItem/SliderItem.css"

interface SliderItemProps {
    item: Subcategory
}

function SliderItem({ item }: SliderItemProps) {
    const contextValue = useContext(AppContext);
    if (!contextValue) throw new Error("CategoryContainer must be used within AppProvider");
    const { category, setCategory } = contextValue;

    function categorySelection(selected: Subcategory | null) {
        setCategory(selected);
    }

    return (
        <button key={item.key}
            type="button"
            className={`slider-card ${category?.key === item.key ? "active" : ""}`}
            onClick={() => categorySelection(item)}
            aria-pressed={category?.key === item.key}
        >
            <div className="card-content">
                <h2 className="card-title">{item.label}</h2>
            </div>
        </button>
    )
}

export default SliderItem
