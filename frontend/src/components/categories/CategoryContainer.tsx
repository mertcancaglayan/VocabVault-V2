import "../categories/CategoryContainer.css"
import Slider from "./slider/Slider"
import { useCategories } from "../../hooks/useCategories";
import ContentState from "../ui/contentState/ContentState";

function CategoryContainer() {
    const { categories, isLoading, error } = useCategories();

    return (
        <ContentState
            isLoading={isLoading}
            error={error}
            isEmpty={categories.length === 0}
            loadingMsg="categories"
        >
            <section className="categories-sliders">
                {categories.map((cat) => (
                    <Slider key={cat.key} cat={cat}></Slider>
                ))}
            </section>

        </ContentState>

    )
}

export default CategoryContainer


