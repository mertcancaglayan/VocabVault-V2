import Header from "../../components/header/Header"
import "../matching/matchingMode.css"

function MatchingMode() {
    return (
        <main className="game-section">
            <Header></Header>
            <section className="matching-grid">
                <ul className="word-list left-list">
                    <li className="word-item">Hello</li>
                    <li className="word-item">Goodbye</li>
                    <li className="word-item">Thank you</li>
                    <li className="word-item">Please</li>
                    <li className="word-item">Yes</li>
                    <li className="word-item">No</li>
                </ul>

                <ul className="word-list right-list">
                    <li className="word-item">Bonjour</li>
                    <li className="word-item">Au Revoir</li>
                    <li className="word-item">Merci</li>
                    <li className="word-item">S'il vous plait</li>
                    <li className="word-item">Oui</li>
                    <li className="word-item">Non</li>
                </ul>
            </section>
        </main>
    )
}

export default MatchingMode
