import { FiThumbsUp } from "react-icons/fi";

const LikeBtn = ({
  initialLikeCount,
}: {
  initialLikeCount: number;
}): JSX.Element => {
  return (
    <div className="flex items-center">
      <button className="flex mr-1.5 hover:text-blue">
        <span className="text-sm mr-1">추천</span>
        <span className="text-lg">
          <FiThumbsUp />
        </span>
      </button>
      <span className="font-semibold">{initialLikeCount}</span>
    </div>
  );
};

export default LikeBtn;
