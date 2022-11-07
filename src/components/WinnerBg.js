import { useGlobalContext } from "../context";

const WinnerBg = () => {
  const { isWinnerDeclared, displayWinnerBgColor } = useGlobalContext();

  return (
    <div
      className={`${
        isWinnerDeclared
          ? `winner-background ${displayWinnerBgColor()}`
          : "winner-background "
      }`}
    ></div>
  );
};

export default WinnerBg;
