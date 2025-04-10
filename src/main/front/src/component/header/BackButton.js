import BackArrow from "./image/backArrow.png";

const BackButton = () => {
  return (
    <button
      className="back-space"
      onClick={() => window.history.back()}
    >
      <img
        src={BackArrow}
        alt="뒤로가기"
      />
    </button>
  );
};
export default BackButton;
