import { useEffect } from "react";
import { useGlobalContext } from "../context";

const RedTimer = () => {
  const {
    isComputerPlaying,
    isWinnerDeclared,
    timePerMove,
    CounterMinusOneSec,
    isPauseMenuOpen,
    otherPlayerIsWinner,
  } = useGlobalContext();

  useEffect(() => {
    let interval = setInterval(() => {
      if (!isPauseMenuOpen) {
        CounterMinusOneSec();

        if (timePerMove === 0) {
          // 1 = red player
          otherPlayerIsWinner(1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isPauseMenuOpen, timePerMove]);

  return (
    <div
      className={`${
        isWinnerDeclared ? "timer red-timer hidden" : "timer red-timer"
      } `}
    >
      <div className="timer-text">
        <p className="timer-turn">{`${
          isComputerPlaying ? "your turn" : "player 1's turn"
        }`}</p>
        <p className="timer-seconds-left">{timePerMove}s</p>
      </div>
    </div>
  );
};

export default RedTimer;
