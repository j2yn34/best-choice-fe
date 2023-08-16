import { Link } from "react-router-dom";
import { Post } from "../../mocks/mockDatas/postListData";
import ChattingBadge from "../common/ChattingBadge";
import { AiOutlineComment } from "react-icons/ai";
import { FiThumbsUp } from "react-icons/fi";

const PostCard = ({ Data }: { Data: Post }): JSX.Element => {
  return (
    <Link
      to={`/posts/${Data.postId}`}
      className="min-w-[540px] bg-white rounded-xl p-5 shadow-md"
    >
      <div className="flex justify-between items-center">
        <div
          key={Data.postId}
          className="font-semibold text-lg truncate max-w-[414px]"
        >
          {Data.title}
        </div>
        {Data.chattingActive ? <ChattingBadge /> : ""}
      </div>

      <div className="mt-5 flex flex-col lg:flex-row items-center justify-between">
        <div className="p-5 flex items-center bg-red-300 min-w-[224px] min-h-[76px] rounded-[10px]">
          <p className="text-base font-bold text-red-dark mr-2.5">A</p>
          <p>{Data.optionA}</p>
        </div>
        <p className="text-base font-bold">vs</p>
        <div className="p-5 flex items-center bg-blue-300 min-w-[224px] min-h-[76px] justify-end rounded-[10px]">
          <p>{Data.optionB}</p>
          <p className="text-base font-bold text-blue-dark ml-2.5">B</p>
        </div>
      </div>
      <div className="flex justify-between items-baseline mt-5">
        <div className="flex items-center">
          <div className="flex items-center">
            <FiThumbsUp />
            <p className="ml-1 text-sm"> {Data.heartCount}</p>
          </div>
          <div className="flex items-center ml-3.5">
            <AiOutlineComment />
            <p className="ml-1 text-sm"> {Data.commentCount}</p>
          </div>
        </div>
        <div className="flex text-sm text-gray">
          <p className="mr-3.5">{Data.member.nickname}</p>
          <p>{Data.createdDate}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
