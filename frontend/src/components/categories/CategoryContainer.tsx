import { useEffect, useState } from "react"
import "../categories/CategoryContainer.css"
import { getCategoriesV2, type CategoryDocument, } from "../../api/api"
import Slider from "./slider/Slider"

function CategoryContainer() {
    const [categories, setCategories] = useState<CategoryDocument[]>([])


    useEffect(() => {
        getCategoriesV2().then(data => setCategories(data)).catch(err => console.error(err))
    }, [])


    return (
        <section className="categories-sliders">

            {/* {categories.map((cat) => (
                <button key={cat.key}
                    type="button"
                    className={`category-card ${category?.key === cat.key ? "active" : ""}`}
                    onClick={() => setCategory(cat)}
                    aria-pressed={category?.key === cat.key}
                >
                    <div className="category-icon">{cat.emoji}</div>
                    <div className="category-content">
                        <h2 className="category-title">{cat.label}</h2>
                        <p className="category-description">{cat.description}</p>
                    </div>
                </button>
            ))} */}

            {categories.map((cat) => (
                <Slider key={cat.key} cat={cat}></Slider>
            ))}

        </section>
    )
}

export default CategoryContainer


