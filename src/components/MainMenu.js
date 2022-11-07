import Logo from "./Logo";
import { Link } from "react-router-dom";
import PlayVCpuIcon from "../assets/images/player-vs-cpu.svg";
import PlayVPlayIcon from "../assets/images/player-vs-player.svg";
import { useGlobalContext } from "../context";

const MainMenu = () => {
  const { openGameRules, computerOpponent, humanOpponent } = useGlobalContext();

  return (
    <div className="menu">
      <Logo />
      <div>
        {/* Player vs Cpu button when this feature is added */}
        {/* <Link
          to="/gamescreen"
          className="menu-link pink-bg-clr white-text-clr"
          onClick={computerOpponent}
        >
          play vs cpu
          <img
            src={PlayVCpuIcon}
            alt="player vs cpu icon"
            className="menu-link-icon"
          />
        </Link> */}

        <Link
          to="/gamescreen"
          className="menu-link yellow-bg-clr black-text-clr"
          onClick={humanOpponent}
        >
          play vs player
          <img
            src={PlayVPlayIcon}
            alt="player vs player icon"
            className="menu-link-icon"
          />
        </Link>

        <button className="menu-btn" onClick={openGameRules}>
          game rules
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
