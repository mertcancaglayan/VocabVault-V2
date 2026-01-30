import { useEffect, useState } from "react";
import "./Table.css";
import { getWords } from "../../api/api";
import type { WordsI } from "../../models/models";
import TableRow from "./table_row/TableRow";


export const Table = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [words, setWords] = useState<WordsI>();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchWords() {
            try {
                setIsLoading(true);
                const data = await getWords();
                if (isMounted) setWords(data);
            } catch (err) {
                if (isMounted) setError(err as Error);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        }

        fetchWords();

        return () => {
            isMounted = false;
        };
    }, []);

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
                     {words?.words.map((word, i)=> {
                        return <TableRow key={i} {...word}></TableRow>
                     })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
