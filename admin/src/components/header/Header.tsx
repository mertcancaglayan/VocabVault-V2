import "./Header.css"

/**
 * Renders the admin header for the Vocab Vault application.
 *
 * @returns A JSX <header> element containing the title "📚 Vocab Vault – Admin Panel".
 */
function Header() {
    return (
        <header className="admin-header">
            <h1>📚 Vocab Vault – Admin Panel</h1>
        </header>
    )
}

export default Header