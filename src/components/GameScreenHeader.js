import React from "react";
import Logo from "./Logo";
import { useGlobalContext } from "../context";

const GameScreenHeader = () => {
  const { openPauseMenu, restartGame } = useGlobalContext();
  return (
    <div className="game-screen-header">
      <button
        className="game-screen-btn game-screen-menu-btn"
        onClick={openPauseMenu}
      >
        Menu
      </button>
      <Logo />
      <button className="game-screen-btn" onClick={restartGame}>
        Restart
      </button>
    </div>
  );
};

export default GameScreenHeader;
