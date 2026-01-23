import "../categories/CategoryContainer.css"
import Slider from "./slider/Slider"
import { useCategories } from "../../hooks/useCategories";
import ContentState from "../ui/contentState/ContentState";
import type { allowedLangs } from "../../models/models";

interface CategoryContainerProps {
    fromLang: allowedLangs;
}

function CategoryContainer({ fromLang }: CategoryContainerProps) {
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
                    <Slider key={cat.key} cat={cat} fromLang={fromLang}></Slider>
                ))}
            </section>
        </ContentState>
    )
}

export default CategoryContainer


