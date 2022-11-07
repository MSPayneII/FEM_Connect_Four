import { useGlobalContext } from "../context";

const WinnerCard = () => {
  const { displayWinnerName, startNewGame } = useGlobalContext();

  return (
    <div className="winner-card">
      <div className="winner-card-text">
        <p className="winner-name">
          {displayWinnerName() === "no one" ? "no one" : displayWinnerName()}
        </p>
        <p className="winner-statement">
          {displayWinnerName() === "you" ? "win" : "wins"}
        </p>
        <button
          className="game-screen-btn play-again-btn"
          onClick={startNewGame}
        >
          play again
        </button>
      </div>
    </div>
  );
};

export default WinnerCard;
