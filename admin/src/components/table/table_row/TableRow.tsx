import type { Word } from "../../../models/models"
import "./TableRow.css"

function TableRow(word: Word) {
    return (
        <tr>
            <td className="cell-id">{word._id}</td>
            <td><span className="cell-badge badge-{word.level.toLowerCase()}">{word.level}</span></td>
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
                {/* <div className="action-buttons">
                    <button className="icon-btn" onclick="openModal('edit', '{word._id}')" title="Edit">✏️</button>
                    <button className="icon-btn" onclick="openModal('view', '{word._id}')" title="View Details">👁️</button>
                    <button className="icon-btn delete" onclick="deleteWord('{word._id}')" title="Delete">🗑️</button>
                </div> */}
                <div className="action-buttons">
                    <button className="icon-btn" title="Edit">✏️</button>
                    <button className="icon-btn" title="View Details">👁️</button>
                    <button className="icon-btn delete" title="Delete">🗑️</button>
                </div>
            </td>
        </tr>
    )
}

export default TableRow
