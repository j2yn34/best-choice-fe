import { useState } from "react";
// import { FiThumbsUp } from "react-icons/fi";
import { RiThumbUpLine, RiThumbUpFill } from "react-icons/ri";

const LikeBtn = ({
  initialLikeCount,
  isComment,
}: {
  initialLikeCount: number;
  isComment: boolean;
}): JSX.Element => {
  const [totalLikeCount, setTotalLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(false);

  const onLikeClick = () => {
    if (!isLiked) {
      setTotalLikeCount(totalLikeCount + 1);
      // like post 전송
    } else {
      setTotalLikeCount(totalLikeCount - 1);
      // unlike post 전송
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="flex items-center min-w-fit">
      <button
        onClick={onLikeClick}
        className={`flex items-center mr-1 hover:text-blue shrink-0 ${
          isLiked ? "text-blue" : ""
        }`}
      >
        <span className={`text-sm mr-1 ${isComment ? "hidden" : ""}`}>
          추천
        </span>
        <span className={`${isComment ? "" : "text-lg"}`}>
          {!isLiked ? <RiThumbUpLine /> : <RiThumbUpFill />}
        </span>
      </button>
      <span className={`${isComment ? "" : "font-semibold"}`}>
        {totalLikeCount}
      </span>
    </div>
  );
};

export default LikeBtn;
