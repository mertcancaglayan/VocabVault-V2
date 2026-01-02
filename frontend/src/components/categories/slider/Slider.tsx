import type { CategoryDocument } from "../../../api/api";
import "../slider/Slider.css";
import SliderItem from "./slideItem/SliderItem";
import { getCategoryIcons } from "../../../data/categoryIcons";

interface SliderCategoryProp {
    cat: CategoryDocument;
}
const iconMap = new Map(
    getCategoryIcons().map(icon => [icon.key, icon])
);


function Slider({ cat }: SliderCategoryProp) {


    return (
        <div className="sliderContainer">
            <h5>{cat.label}</h5>

            <div className="slider snaps-inline">
                {cat.subcategories.map((e) => {
                    const icon = iconMap.get(e.key);

                    return (
                        <SliderItem
                            key={e.key}
                            item={e}
                            icon={icon}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Slider;