import { FaGear } from "react-icons/fa6"
import "../header/Header.css"
import { useEffect, useRef, useState } from "react";

function Header() {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setOpen(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && event.target instanceof Node && !dropdownRef.current.contains(event.target)) { setOpen(false) }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])

    return (
        <header className="header">
            <h2 className="header-title">The Word Vault Project</h2>

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
                            <label htmlFor="select-lang">Target Language</label>
                            <select id="select-lang" defaultValue="en">
                                <option value="tr">🇹🇷 Türkçe</option>
                                <option value="en">🇬🇧 English</option>
                                <option value="pl">🇵🇱 Polski</option>
                            </select>
                        </div>

                        <div className="level-selection">
                            <label htmlFor="select-level">Difficulty</label>
                            <select id="select-level" defaultValue="normal">
                                <option value="easy">🐣 Easy</option>
                                <option value="normal">👤 Normal</option>
                                <option value="expert">🔥 Expert</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </header >
    )
}

export default Header;
