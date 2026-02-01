import { useContext } from "react"
import "../form_modal/FormModal.css"
import AppContext from "../../context/AppContext"

function ViewModal() {
    const contextValue = useContext(AppContext)
    if (!contextValue) throw new Error("Error");

    const { setIsViewModalOpen, setIsEditModalOpen, setModalWord, modalWord } = contextValue

    function closeModal() {
        setIsViewModalOpen(false)
        setModalWord(undefined)
    }

    function handleEdit() {
        setIsViewModalOpen(false)
        setIsEditModalOpen(true)
    }

    if (!modalWord) return

    return (
        <div className="modal" id="viewModal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>📖 Word Details</h2>
                    <button className="modal-close" onClick={closeModal}>&times;</button>
                </div>
                <div className="modal-body" id="viewModalBody">
                    <div className="form-section">
                        <div className="form-section-title">Basic Information</div>
                        <div style={{ display: "grid", gap: "10px" }}>
                            <div><strong>ID:</strong> {modalWord._id}</div>
                            <div><strong>Level:</strong> {modalWord.level}</div>
                            <div><strong>Category:</strong> {modalWord.category_key}</div>
                            <div><strong>Subcategory:</strong> {modalWord.sub_category_key} ({modalWord.sub_category_label || ""})</div>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="form-section-title">🌐 Translations</div>
                        <div className="lang-group">
                            <div className="lang-item"><span className="lang-label">EN:</span> <span className="lang-value">{modalWord.translations?.en || ""}</span></div>
                            <div className="lang-item"><span className="lang-label">TR:</span> <span className="lang-value">{modalWord.translations?.tr || ""}</span></div>
                            <div className="lang-item"><span className="lang-label">PL:</span> <span className="lang-value">{modalWord.translations?.pl || ""}</span></div>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="form-section-title">📝 Examples</div>
                        <div className="lang-group">
                            <div className="lang-item"><span className="lang-label">EN:</span> <span className="lang-value">{modalWord.example?.en || ""}</span></div>
                            <div className="lang-item"><span className="lang-label">TR:</span> <span className="lang-value">{modalWord.example?.tr || ""}</span></div>
                            <div className="lang-item"><span className="lang-label">PL:</span> <span className="lang-value">{modalWord.example?.pl || ""}</span></div>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="form-section-title">🔊 Phonetics</div>
                        <div className="lang-group">
                            <div className="lang-item"><span className="lang-label">EN:</span> <span className="lang-value">{modalWord.phonetics?.en || ""}</span></div>
                            <div className="lang-item"><span className="lang-label">TR:</span> <span className="lang-value">{modalWord.phonetics?.tr || ""}</span></div>
                            <div className="lang-item"><span className="lang-label">PL:</span> <span className="lang-value">{modalWord.phonetics?.pl || ""}</span></div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary" onClick={handleEdit}>✏️ Edit</button>
                    <button className="btn btn-outline" onClick={closeModal}>Close</button>
                </div>
            </div>
        </div >

    )
}

export default ViewModal
