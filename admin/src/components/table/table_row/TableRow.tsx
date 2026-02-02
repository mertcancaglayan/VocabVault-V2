import type { Word } from "../../../models/models"
import "./TableRow.css"
import { deleteWord } from "../../../api/api"
import { useAppContext } from "../../../hooks/useAppContext"

function TableRow(word: Word) {
    const { setIsEditModalOpen, setModalWord, setIsViewModalOpen } = useAppContext()

    function openModal(word: Word, typeModel: string) {
        switch (typeModel) {
            case "edit":
                setIsEditModalOpen(true)
                setModalWord(word)
                break;
            case "view":
                setIsViewModalOpen(true)
                setModalWord(word)
                break
            default:
                setIsViewModalOpen(true)
                setModalWord(word)
                break;
        }
    }

    async function handleDelete(word: Word) {
        try {
            await deleteWord(word._id)
        } catch (error) {
            console.error("Error while deleting the word:", error)
        } finally {
            setIsEditModalOpen(false);
        }
    }

    return (
        <tr>
            <td className="cell-id">{word._id}</td>
            <td><span className={`cell-badge badge-${word.level.toLowerCase()}`}>{word.level}</span></td>
            <td>{word.category_key}</td>
            <td>
                <div>{word.sub_category_key}</div>
                <small className="text-muted">{word.sub_category_label}</small>
            </td>
            <td className="cell-translation">
                <div className="lang-group">
                    <div className="lang-item"><span className="lang-label">EN:</span> <span className="lang-value">{word.translations?.en || ""}</span></div>
                    <div className="lang-item"><span className="lang-label">TR:</span> <span className="lang-value">{word.translations?.tr || ""}</span></div>
                    <div className="lang-item"><span className="lang-label">PL:</span> <span className="lang-value">{word.translations?.pl || ""}</span></div>
                </div>
            </td>
            <td className="cell-example">
                <div className="lang-group">
                    <div className="lang-item"><span className="lang-label">EN:</span> <span className="lang-value">{word.example?.en || ""}</span></div>
                    <div className="lang-item"><span className="lang-label">TR:</span> <span className="lang-value">{word.example?.tr || ""}</span></div>
                    <div className="lang-item"><span className="lang-label">PL:</span> <span className="lang-value">{word.example?.pl || ""}</span></div>
                </div>
            </td>
            <td className="cell-actions">
                <div className="action-buttons">
                    <button className="icon-btn" onClick={() => openModal(word, "edit")} title="Edit">✏️</button>
                    <button className="icon-btn" onClick={() => openModal(word, "view")} title="View Details">👁️</button>
                    <button className="icon-btn delete" onClick={() => handleDelete(word)} title="Delete">🗑️</button>
                </div>
            </td>
        </tr>
    )
}

export default TableRow
