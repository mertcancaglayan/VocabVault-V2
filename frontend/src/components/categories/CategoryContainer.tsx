import { useContext, useEffect, useState } from "react"
import "../categories/CategoryContainer.css"
import { getCategoriesV2, type CategoryItem } from "../../api/api"
import AppContext from "../../context/AppContext"

function CategoryContainer() {
    const [categories, setCategories] = useState<CategoryItem[]>([])


    const contextValue = useContext(AppContext);
    if (!contextValue) throw new Error("CategoryContainer must be used within AppProvider");
    const { category, setCategory } = contextValue;


    useEffect(() => {
        getCategoriesV2().then(data => setCategories(data[0].categories)).catch(err => console.error(err))
    }, [])

       useEffect(() => {
        console.log("Selected category:", category);
    }, [category]);



    return (
        <section className="categories-grid">

            {categories.map((cat) => (
                <button key={cat.key}
                    type="button"
                    className={`category-card ${category?.key === cat.key ? "active" : ""}`}
                    onClick={() => setCategory(cat)}
                    aria-pressed={category?.key === cat.key}
                >
                    <div className="category-icon">{/* svg */}</div>
                    <div className="category-content">
                        <h2 className="category-title">{cat.label}</h2>
                        <p className="category-description">Explore the natural world</p>
                    </div>
                </button>
            ))}


        </section>
    )
}

export default CategoryContainer
