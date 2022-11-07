import { useEffect } from "react";
import { useGlobalContext } from "../context";

const YellowTimer = () => {
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
          // 2 = yellow
          otherPlayerIsWinner(2);
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
        isWinnerDeclared ? "timer yellow-timer hidden" : "timer yellow-timer"
      } `}
    >
      <div className="timer-text">
        <p className="timer-turn">{`${
          isComputerPlaying ? "cpu's turn" : "player 2's turn"
        }`}</p>
        <p className="timer-seconds-left">{timePerMove}s</p>
      </div>
    </div>
  );
};

export default YellowTimer;
