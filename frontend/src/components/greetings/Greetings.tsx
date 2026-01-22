import MainButton from "../ui/mainButton/MainButton";
import { useRandomGreetings } from "../../data/greetings";
import "../greetings/Greetings.css"

interface GreetingsSectionProps {
    onContinue: () => void
}

function GreetingsSection({ onContinue }: GreetingsSectionProps) {
    const greeting = useRandomGreetings()

    return (
        <section className="greetings-section">
            <picture>
                <img src="/images/mainPageImg.png" alt="Ana sayfa için görsel" loading="lazy" />
            </picture>
            {greeting && <h2>{greeting}</h2>}

            <div className="btn-bottom">
            </div>
            <MainButton onClick={onContinue} text="Let's Start" />
        </section>
    );
}

export default GreetingsSection;
