import "../slider-nav/sliderNavBtn.css"
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import type { SlideDirection } from "../slider/Slider";

interface SliderNavBtnProps {
    slide: (direction: SlideDirection) => void
}

function SliderNavBtn({ slide }: SliderNavBtnProps) {
    return (
        <div className="slider-navs">
            <div className="slider-prev" onClick={() => slide("prev")} ><FaArrowLeft /></div>
            <div className="slider-next" onClick={() => slide("next")}><FaArrowRight /></div>
        </div>
    )
}

export default SliderNavBtn
