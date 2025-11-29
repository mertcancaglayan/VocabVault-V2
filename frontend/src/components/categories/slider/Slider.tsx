import type { CategoryDocument } from "../../../api/api"
import "../slider/Slider.css"
import SliderItem from "./slideItem/SliderItem";


interface SliderCategoryProp {
    cat: CategoryDocument;
}

function Slider({ cat }: SliderCategoryProp) {
    return (
        <div key={cat.key} className="sliderContainer">
            <h5>{cat.label}</h5>

            <div className="slider snaps-inline">
                {cat.subcategories.map((e) => {
                    return (
                        <SliderItem key={e.key} item={e}></SliderItem>
                    )
                })}
            </div>
        </div>

    )
}

export default Slider
