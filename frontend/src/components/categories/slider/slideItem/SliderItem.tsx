import { useContext } from "react";
import AppContext from "../../../../context/AppContext";

import "../slideItem/SliderItem.css"
import type { CategoryIcon } from "../../../../data/categoryIcons";
import type { Subcategory } from "../../../../models/models";

interface SliderItemProps {
    item: Subcategory,
    icon?: CategoryIcon
}

function SliderItem({ item, icon }: SliderItemProps) {
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
                <span className="category-icon">
                    {icon?.icon}
                </span>
            </div>
        </button>
    )
}

export default SliderItem
