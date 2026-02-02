import { useEffect } from "react";
import "./Table.css";
import TableRow from "./table_row/TableRow";

import { useAppContext } from "../../hooks/useAppContext";
import { useWords } from "../../hooks/useWords";


export const Table = () => {
    const contextValue = useAppContext()
    const { searchQuery, setCategories, page, } = contextValue

    const { words: wordsList, isLoading, error } = useWords(page, searchQuery)

    useEffect(() => {
        if (!wordsList) return;

        const categorySet = new Map<string, string>();

        wordsList.forEach(element => {
            categorySet.set(element.sub_category_key, element.sub_category_label)
        });

        setCategories(categorySet);
    }, [wordsList, setCategories]);


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
                        {wordsList
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