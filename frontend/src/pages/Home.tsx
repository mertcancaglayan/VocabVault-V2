import GreetingsSection from '../components/greetings/Greetings'
import "../../src/index.css";
import Header from '../components/header/Header';


function Home() {
    return (
        <main>
            <Header></Header>
            <GreetingsSection></GreetingsSection>
        </main>
    )
}

export default Home
