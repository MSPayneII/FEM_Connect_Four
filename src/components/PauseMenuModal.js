import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

const PauseMenuModal = () => {
  const { isPauseMenuOpen, closePauseMenu, restartGame } = useGlobalContext();

  return (
    <div
      className={`${
        isPauseMenuOpen ? "pause-menu-overlay show-modal" : "pause-menu-overlay"
      }`}
    >
      <div className="pause-menu">
        <h1 className="pause-menu-header">pause</h1>

        <div>
          <button
            className="menu-btn pause-menu-btn text-center"
            onClick={closePauseMenu}
          >
            continue game
          </button>
          <button
            className="menu-btn pause-menu-btn text-center"
            onClick={restartGame}
          >
            restart
          </button>
          <Link
            to="/"
            className="menu-link pause-menu-link text-center pink-bg-clr white-text-clr"
            onClick={closePauseMenu}
          >
            quit game
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PauseMenuModal;
