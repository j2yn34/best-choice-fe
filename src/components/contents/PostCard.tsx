import { Link } from "react-router-dom";
import { Post } from "../../mocks/mockType";
import ChattingBadge from "../common/ChattingBadge";
import moment from "moment";
import { AiOutlineComment } from "react-icons/ai";
import { RiThumbUpLine } from "react-icons/ri";

const PostCard = ({ Data }: { Data: Post }): JSX.Element => {
  return (
    <Link
      to={`/posts/${Data.postId}`}
      className="w-full bg-white rounded-xl p-5 shadow-md"
    >
      <div className="flex justify-between items-center">
        <div className="font-semibold text-lg truncate">{Data.title}</div>
        {Data.liveChatActive ? <ChattingBadge /> : ""}
      </div>

      <div className="mt-5 flex flex-col md:flex-row items-center justify-between">
        <div className="px-5 py-2 flex items-center bg-red-300 w-full min-h-[76px] rounded-xl">
          <p className="font-bold text-red-dark mr-2.5">A</p>
          <p>{Data.optionA}</p>
        </div>
        <p className="font-bold px-4 py-2">vs</p>
        <div className="px-5 py-2 flex items-center bg-blue-300 w-full min-h-[76px] rounded-xl">
          <p className="font-bold text-blue-dark mr-2.5">B</p>
          <p>{Data.optionB}</p>
        </div>
      </div>
      <div className="flex justify-between items-baseline mt-5">
        <div className="flex items-center">
          <div className="flex items-center">
            <RiThumbUpLine />
            <p className="ml-1 text-sm"> {Data.likeCount}</p>
          </div>
          <div className="flex items-center ml-3.5">
            <AiOutlineComment />
            <p className="ml-1 text-sm"> {Data.commentCount}</p>
          </div>
        </div>
        <div className="flex text-sm text-gray">
          <p className="mr-3.5">{Data.member.nickname}</p>
          <p>{moment(Data.createdDate).format("YYYY.MM.DD")}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
