import { useGlobalContext } from "../context";
import Player2Icon from "../assets/images/player-two.svg";
import CPUIcon from "../assets/images/cpu.svg";

const YellowScoreCard = () => {
  const { isComputerPlaying, yellowScore } = useGlobalContext();

  return (
    <div className="score-card yellow-card">
      <img
        src={`${isComputerPlaying ? CPUIcon : Player2Icon}`}
        alt="opponent"
        className="opponent-icon"
      />

      <div className="score-card-stats stat-mg-right">
        <p className="score-card-player-title opp-title">{`${
          isComputerPlaying ? "cpu" : "player 2"
        }`}</p>
        <p className="score-card-score">{yellowScore}</p>
      </div>
    </div>
  );
};

export default YellowScoreCard;
