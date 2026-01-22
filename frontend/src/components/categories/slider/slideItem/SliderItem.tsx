import "../slideItem/SliderItem.css"
import type { CategoryIcon } from "../../../../data/categoryIcons";
import type { Subcategory } from "../../../../models/models";
import { useAppContext } from "../../../../hooks/useAppContext";

interface SliderItemProps {
    item: Subcategory,
    icon?: CategoryIcon
}

function SliderItem({ item, icon }: SliderItemProps) {
    const contextValue = useAppContext()

    const { languagePair, category, setCategory } = contextValue;

    if (!languagePair) return null;
    const { from } = languagePair;

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
                <h2 className="card-title">{item.labels[from]}</h2>
                <span className="category-icon">
                    {icon?.icon}
                </span>
            </div>
        </button>
    )
}

export default SliderItem
