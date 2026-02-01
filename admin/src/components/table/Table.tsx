import { useContext, useEffect, useMemo, useState } from "react";
import "./Table.css";
import { getWords } from "../../api/api";
import type { WordsI } from "../../models/models";
import TableRow from "./table_row/TableRow";
import AppContext from "../../context/AppContext";
import { wordSearchMatches } from "../../utils/wordSearchMatches";


export const Table = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [words, setWords] = useState<WordsI>();
    const [error, setError] = useState<Error | null>(null);

    const contextValue = useContext(AppContext);
    if (!contextValue) throw new Error("Error");
    const { isEditModalOpen, shouldRefresh, setShouldRefresh, searchQuery, setTotalFilteredWord, setCategories } = contextValue

    /**
     * Fetches words from the API and updates local loading, error, and words state.
     *
     * Sets the loading flag while the request is in progress, stores returned words on success,
     * and records any error encountered.
     */
    async function fetchWords() {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getWords();
            setWords(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchWords();
    }, []);

    useEffect(() => {
        if (!isEditModalOpen && shouldRefresh) {
            fetchWords();
            setShouldRefresh(false);
        }
    }, [isEditModalOpen, shouldRefresh, setShouldRefresh]);

    useEffect(() => {
        if (!words) return;

        const categorySet = new Map<string, string>();

        words.words.forEach(element => {
            categorySet.set(element.sub_category_key, element.sub_category_label)
        });

        setCategories(categorySet);
    }, [words, setCategories]);


    const filteredWords = useMemo(() => {
        if (!words) return [];

        return words.words.filter(word =>
            wordSearchMatches(word, searchQuery)
        );
    }, [words, searchQuery]);

    useEffect(() => {
        setTotalFilteredWord(filteredWords.length);
    }, [filteredWords, setTotalFilteredWord]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!words) return <div>No Data</div>

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
                            <th>Example (EN)</th>
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