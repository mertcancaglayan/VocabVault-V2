import { useEffect, useMemo } from "react";
import "./Table.css";
import TableRow from "./table_row/TableRow";
import { wordSearchMatches } from "../../utils/wordSearchMatches";
import { useAppContext } from "../../hooks/useAppContext";
import { useWords } from "../../hooks/useWords";


export const Table = () => {
    const contextValue = useAppContext()
    const { searchQuery, setTotalFilteredWord, setCategories, page,  setPageCount } = contextValue

    const { words: wordsList, isLoading, error } = useWords(page)

    useEffect(() => {
        if (!wordsList) return;

        const categorySet = new Map<string, string>();
        setPageCount(wordsList.totalPages)

        wordsList.words.forEach(element => {
            categorySet.set(element.sub_category_key, element.sub_category_label)
        });

        setCategories(categorySet);
    }, [wordsList, setCategories, setPageCount]);


    const filteredWords = useMemo(() => {
        if (!wordsList) return [];

        return wordsList.words.filter(word =>
            wordSearchMatches(word, searchQuery)
        );
    }, [wordsList, searchQuery]);

    useEffect(() => {
        setTotalFilteredWord(filteredWords.length);
    }, [filteredWords, setTotalFilteredWord]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!wordsList) return <div>No Data</div>

    return (
        <div className="table-wrapper">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Level</th>
                            <th>Category</th>
                            <th>Subcategory</th>
                            <th>Translations</th>
                            <th>Examples</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredWords
                            .map((word) => (
                                <TableRow key={word._id} {...word} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;