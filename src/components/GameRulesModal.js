import React from "react";
import CheckIcon from "../assets/images/icon-check.svg";
import { useGlobalContext } from "../context";

const GameRulesModal = () => {
  const { isGameRulesOpen, closeGameRules } = useGlobalContext();

  return (
    <div
      className={`${
        isGameRulesOpen ? "game-rules-overlay show-modal" : "game-rules-overlay"
      }`}
    >
      <article className="game-rules-modal">
        <h1 className="game-rules-modal-header">rules</h1>
        <div className="game-rules-modal-body">
          <div className="game-rules-section-1">
            <h2 className="game-rules-modal-subheader">objective</h2>
            <p className="game-rules-modal-content">
              Be the first player to connect 4 of the same colored discs in a
              row (either vertically, horizontally, or diagonally).
            </p>
          </div>
          <div>
            <h2 className="game-rules-modal-subheader">how to play</h2>
            <ol className="games-rules-modal-list">
              <li className="game-rules-modal-content">
                Red goes first in the first game.
              </li>
              <li className="game-rules-modal-content">
                Players must alternate turns, and only one disc can be dropped
                in each turn.
              </li>
              <li className="game-rules-modal-content">
                The game ends when there is a 4-in-a-row or a stalemate.
              </li>
              <li className="game-rules-modal-content">
                The starter of the previous game goes second on the next game.
              </li>
            </ol>
          </div>
        </div>
        <button className="check-mark-btn" onClick={closeGameRules}>
          <svg
            width="70px"
            height="75px"
            viewBox="0 0 70 75"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
            className="check-mark-icon"
          >
            <title>icon-check</title>
            <g
              id="Designs"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="icon-check">
                <circle
                  id="Oval-Copy-37"
                  fill="#000000"
                  cx="35"
                  cy="35"
                  r="35"
                ></circle>
                <circle
                  id="Oval-Copy-38"
                  fill="#000000"
                  cx="35"
                  cy="40"
                  r="35"
                ></circle>
                <circle
                  id="Oval-Copy-39"
                  fill="#FD6687"
                  cx="35"
                  cy="35"
                  r="32"
                ></circle>
                <polyline
                  id="Path"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  points="20 34.5819497 30.2640104 44.84596 50.1099704 25"
                ></polyline>
              </g>
            </g>
          </svg>
        </button>
      </article>
    </div>
  );
};

export default GameRulesModal;
