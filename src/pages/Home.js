import MainMenu from "../components/MainMenu";
import GameRulesModal from "../components/GameRulesModal";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.querySelector("body").style.backgroundColor = "#5c2dd5";
  }, []);
  return (
    <main>
      <MainMenu />
      <GameRulesModal />
    </main>
  );
};

export default Home;
