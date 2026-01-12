import { useEffect, useState } from "react"
import "../categories/CategoryContainer.css"
import { getCategoriesV2 } from "../../api/api"
import Slider from "./slider/Slider"
import type { CategoryDocument } from "../../models/models"
import Spinner from "../ui/spinner/Spinner"

function CategoryContainer() {
    const [categories, setCategories] = useState<CategoryDocument[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)

        getCategoriesV2()
            .then(data => {
                setCategories(data)
            })
            .catch(err => {
                console.error(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])


    if (isLoading) return <Spinner message={"Loading categories..."}></Spinner>;

    return (
        <section className="categories-sliders">
            {categories.map((cat) => (
                <Slider key={cat.key} cat={cat}></Slider>
            ))}
        </section>
    )
}

export default CategoryContainer


