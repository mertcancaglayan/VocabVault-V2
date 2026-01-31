import { useContext, useEffect, useState } from "react";
import "./Table.css";
import { getWords } from "../../api/api";
import type { WordsI } from "../../models/models";
import TableRow from "./table_row/TableRow";
import AppContext from "../../context/AppContext";


export const Table = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [words, setWords] = useState<WordsI>();
    const [error, setError] = useState<Error | null>(null);

    const contextValue = useContext(AppContext);
    if (!contextValue) throw new Error("Error");
    const { isEditModalOpen, shouldRefresh, setShouldRefresh } = contextValue

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
                        {words?.words.map((word) => {
                            return <TableRow key={word._id} {...word} />
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;