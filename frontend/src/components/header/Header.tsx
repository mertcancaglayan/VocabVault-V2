import { FaGear } from "react-icons/fa6"
import "../header/Header.css"
import { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";
import type { allowedLangs } from "../../models/models";
import { settingsText } from "../../data/settingsTexts";

const languages = [{ lang: "tr", text: "🇹🇷 Türkçe " }, { lang: "en", text: "🇬🇧 English" }, { lang: "pl", text: "🇵🇱 Polski" }]

function Header() {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && event.target instanceof Node && !dropdownRef.current.contains(event.target)) { setOpen(false) }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])

    const contextValue = useContext(AppContext);
    if (!contextValue) {
        throw new Error("Home must be used within AppProvider");
    }

    const { languagePair, updateLanguage, difficulty, setDifficulty } = contextValue

    if (!languagePair) return
    const { from, to } = languagePair;

    const texts = settingsText[from]

    const handleClick = () => {
        setOpen(prev => !prev);
    };

    const handleLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateLanguage({ fromLang: from, toLang: e.target.value as allowedLangs })

    }

    const handleDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDifficulty(e.target.value)
    }

    return (
        <header className="header">
            <h2 className="header-title"><Link to={"/"}>The Word Vault Project</Link></h2>

            <div className="settings-wrapper" ref={dropdownRef}>
                <button
                    onClick={handleClick}
                    className={`settings-btn ${open ? "active" : ""}`}
                    aria-label="Settings"
                >
                    <FaGear />
                </button>

                {open && (
                    <div className="dropDown-menu">
                        <div className="lang-selection">
                            <label htmlFor="select-lang">{texts.targetLanguage}</label>
                            <select onChange={handleLang} id="select-lang" defaultValue={to}>
                                {languages.map((lang) => {
                                    return (<option disabled={to === lang.lang || lang.lang === from} key={lang.lang} value={lang.lang}>{lang.text}</option>)
                                })}
                            </select>
                        </div>

                        <div className="level-selection">
                            <label htmlFor="select-level">{texts.difficulty}</label>
                            <select onChange={handleDifficulty} id="select-level" defaultValue={difficulty}>
                                <option value="easy">🐣 {texts.easy}</option>
                                <option value="normal">👤 {texts.normal}</option>
                                <option value="expert">🔥 {texts.expert}</option>
                                <option value="random">😂 {texts.random}</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </header >
    )
}

export default Header;
