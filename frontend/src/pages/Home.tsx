// import GreetingsSection from '../components/greetings/Greetings'
import "../../src/index.css";
import CategoryContainer from "../components/categories/CategoryContainer";
import GameModesComponent from "../components/gameModes/GameModes";
import Header from '../components/header/Header';


function Home() {
    return (
        <main>
            
            <Header></Header>
            {/* <GreetingsSection></GreetingsSection> */}
            <GameModesComponent></GameModesComponent>
            <CategoryContainer></CategoryContainer>
        </main>
    )
}

export default Home
