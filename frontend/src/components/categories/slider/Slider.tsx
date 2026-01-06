import "../slider/Slider.css";
import SliderItem from "./slideItem/SliderItem";
import { getCategoryIcons } from "../../../data/categoryIcons";
import SliderNavBtn from "../slider-nav/SliderNavBtn";
import { useRef } from "react";
import type { CategoryDocument, SlideDirection } from "../../../models/models";

interface SliderCategoryProp {
    cat: CategoryDocument;
}
const iconMap = new Map(
    getCategoryIcons().map(icon => [icon.key, icon])
);

function Slider({ cat }: SliderCategoryProp) {
    const sliderRef = useRef<HTMLDivElement | null>(null);

    function slide(direction: SlideDirection) {
        const slider = sliderRef.current

        if (!slider) return;

        const slideWidth = slider.clientWidth;
        const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

        if (direction === 'prev') {
            if (slider.scrollLeft === 0) return;
            slider.scrollBy({
                left: -slideWidth,
                behavior: 'smooth',
            });
        } else if (direction === 'next') {
            if (slider.scrollLeft === maxScrollLeft) return;
            slider.scrollBy({
                left: slideWidth,
                behavior: 'smooth',
            });
        }
    }

    return (
        <>
            <hr />
            <div className="sliderContainer">
                <div className="slider-top-area">
                    <h5>{cat.label}</h5>
                    <SliderNavBtn slide={slide}></SliderNavBtn>
                </div>

                <div className="slider snaps-inline" ref={sliderRef}>
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
        </>
    );
}

export default Slider;