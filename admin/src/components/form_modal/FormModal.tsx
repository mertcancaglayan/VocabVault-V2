import "./FormModal.css"
import type { Word } from "../../models/models";
import { createWord, updateWord } from "../../api/api";
import { useAppContext } from "../../hooks/useAppContext";
import { useState } from "react";

function FormModal() {
    const { setIsEditModalOpen, modalWord } = useAppContext()

    const [formData, setFormData] = useState<Word>(modalWord || {
        _id: '',
        level: '',
        category_key: '',
        sub_category_key: '',
        sub_category_label: '',
        translations: {
            en: '',
            tr: '',
            pl: ''
        },
        example: {
            en: '',
            tr: '',
            pl: ''
        },
        phonetics: {
            en: '',
            tr: '',
            pl: ''
        }
    } as Word);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (modalWord?._id) {
                await updateWord(formData);
            } else {
                await createWord(formData);
            }
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Error saving word:", error);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData(prev => {
            if (name.includes(".")) {
                const [parent, child] = name.split(".");
                return {
                    ...prev,
                    [parent]: {
                        ...((prev as unknown as Record<string, Word>)[parent] || {}),
                        [child]: value
                    }
                };
            } else {
                return {
                    ...prev,
                    [name]: value
                };
            }
        });
    };

    return (
        <div className="modal" id="editModal" style={{ display: 'flex' }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 id="modalTitle">{formData._id ? "Edit Word" : "Add New Word"}</h2>
                    <button className="modal-close" onClick={() => setIsEditModalOpen(false)}>&times;</button>
                </div>
                <div className="modal-body">
                    <form id="vocabForm" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="id">ID *</label>
                                <input type="text" id="id" name="_id" value={formData._id || ""} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="level">Level *</label>
                                <select id="level" name="level" value={formData.level || ""} onChange={handleChange} required>
                                    <option value="">Select Level</option>
                                    <option value="A1">A1</option>
                                    <option value="A2">A2</option>
                                    <option value="B1">B1</option>
                                    <option value="B2">B2</option>
                                    <option value="C1">C1</option>
                                    <option value="C2">C2</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="category_key">Category Key *</label>
                                <input type="text" id="category_key" name="category_key" value={formData.category_key || ""} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subcategory_key">Subcategory Key *</label>
                                <input type="text" id="subcategory_key" name="sub_category_key" value={formData.sub_category_key || ""} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subcategory_label">Subcategory Label *</label>
                                <input type="text" id="subcategory_label" name="sub_category_label" value={formData.sub_category_label || ""} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="form-section">
                            <div className="form-section-title">🌐 Translations</div>
                            <div className="form-group">
                                <label htmlFor="translations.en">English *</label>
                                <input type="text" id="translations.en" name="translations.en" value={formData.translations?.en || ""} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="translations.tr">Turkish *</label>
                                <input type="text" id="translations.tr" name="translations.tr" value={formData.translations?.tr || ""} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="translations.pl">Polish *</label>
                                <input type="text" id="translations.pl" name="translations.pl" value={formData.translations?.pl || ""} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="form-section">
                            <div className="form-section-title">📝 Example Sentences</div>
                            <div className="form-group">
                                <label htmlFor="example.en">English Example</label>
                                <textarea id="example.en" name="example.en" value={formData.example?.en || ""} onChange={handleChange}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="example.tr">Turkish Example</label>
                                <textarea id="example.tr" name="example.tr" value={formData.example?.tr || ""} onChange={handleChange}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="example.pl">Polish Example</label>
                                <textarea id="example.pl" name="example.pl" value={formData.example?.pl || ""} onChange={handleChange}></textarea>
                            </div>
                        </div>

                        <div className="form-section">
                            <div className="form-section-title">🔊 Phonetics</div>
                            <div className="form-group">
                                <label htmlFor="phonetics.en">English Phonetic</label>
                                <input type="text" id="phonetics.en" name="phonetics.en" value={formData.phonetics?.en || ""} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phonetics.tr">Turkish Phonetic</label>
                                <input type="text" id="phonetics.tr" name="phonetics.tr" value={formData.phonetics?.tr || ""} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phonetics.pl">Polish Phonetic</label>
                                <input type="text" id="phonetics.pl" name="phonetics.pl" value={formData.phonetics?.pl || ""} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                            <button type="submit" className="btn btn-success">💾 Save Word</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FormModal
