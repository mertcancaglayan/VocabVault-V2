import MainButton from "../ui/mainButton/MainButton";
import { useRandomGreetings } from "../../data/greetings";
import { buttonTexts } from "../../data/buttonTexts";
import "../greetings/Greetings.css"

interface GreetingsSectionProps {
    onContinue: () => void;
    fromLang: "en" | "tr" | "pl";
}

function GreetingsSection({ onContinue, fromLang }: GreetingsSectionProps) {
    const greeting = useRandomGreetings()

    const buttonText = buttonTexts[fromLang].greeting

    return (
        <section className="greetings-section">
            <picture>
                <img src="/images/mainPageImg.png" alt="Ana sayfa için görsel" loading="lazy" />
            </picture>
            {greeting && <h2>{greeting}</h2>}

            <div className="btn-bottom">
            </div>
            <MainButton onClick={onContinue} text={buttonText} />
        </section>
    );
}

export default GreetingsSection;
