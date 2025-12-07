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

            {categories.map((cat) => (
                <Slider key={cat.key} cat={cat}></Slider>
            ))}

        </section>
    )
}

export default CategoryContainer


