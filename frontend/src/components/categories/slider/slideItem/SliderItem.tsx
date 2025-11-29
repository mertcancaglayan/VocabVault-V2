import { useContext, useEffect } from "react";
import AppContext from "../../../../context/AppContext";
import { getWords, type Subcategory, type WordItem } from "../../../../api/api";
import "../slideItem/SliderItem.css"

interface SliderItemProps {
    item: Subcategory
}

const wordsCache = new Map<string, WordItem[]>();


function SliderItem({ item }: SliderItemProps) {
    const contextValue = useContext(AppContext);
    if (!contextValue) throw new Error("CategoryContainer must be used within AppProvider");


    const { category, setCategory, languagePair, selectedWords, setSelectedWords } = contextValue;



    async function categorySelection(selected: Subcategory | null) {
        setCategory(selected);

        if (!selected || !languagePair) return;

        const { from, to } = languagePair;

        const cacheKey = `${selected.key}-${from}-${to}`;

        if (wordsCache.has(cacheKey)) {
            setSelectedWords(wordsCache.get(cacheKey)!);
            return;
        }

        try {
            const data = await getWords(selected, from, to);

            setSelectedWords(data.words);

            wordsCache.set(cacheKey, data.words);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        console.log(selectedWords);
    }, [selectedWords])



    return (
        <button key={item.key}
            type="button"
            className={`slider-card ${category?.key === item.key ? "active" : ""}`}
            onClick={() => categorySelection(item)}
            aria-pressed={category?.key === item.key}
        >
            <div className="card-content">
                <h2 className="card-title">{item.label}</h2>
            </div>
        </button>
    )
}

export default SliderItem
