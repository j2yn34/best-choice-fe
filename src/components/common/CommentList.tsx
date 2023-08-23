import { useState } from "react";
import { Comment } from "../../mocks/mockType";
import { FiThumbsUp } from "react-icons/fi";

const list = [1, 2, 3];

const clickDelete = () => {
  alert("댓글 삭제");
};

const CommentList = ({ commentData }: { commentData: Comment[] }) => {
  const [click, setClick] = useState<number>(1);

  return (
    <>
      {commentData.map((comment) => (
        <div
          key={comment.commentId}
          className="p-3 md:px-4 md:py-5 bg-color-bg border-b-2 border-blue-200"
        >
          <div className="flex items-center justify-between">
            <ul className="flex items-center gap-4">
              {comment.option ? (
                <li
                  className={`px-1.5 md:px-2.5 md:py-1 rounded-full text-sm md:text-base ${
                    comment.option === "A"
                      ? "text-red-dark bg-red-100"
                      : "text-blue-dark bg-blue-100"
                  }`}
                >
                  {comment.option}
                </li>
              ) : (
                ""
              )}

              <li className="md:text-base text-sm">
                {comment.member.nickname}
              </li>
              <li className="md:text-base text-sm">{comment.createdDate}</li>
              <li className="flex items-center gap-1 cursor-pointer text-sm md:text-base">
                <p>
                  <FiThumbsUp />{" "}
                </p>
                <p>{comment.likeCount}</p>
              </li>
            </ul>
            {comment.commentId === 1 ? (
              <button
                className="text-red-dark text-sm md:text-base"
                onClick={clickDelete}
              >
                삭제
              </button>
            ) : (
              ""
            )}
          </div>
          <p className="mt-4">{comment.content}</p>
        </div>
      ))}
      <ul className="flex items-center justify-center mt-8 gap-1">
        {list.map((num) => (
          <li
            key={num}
            className={`text-xl px-3.5 py-1 ${
              num === click ? "bg-blue-100" : ""
            } rounded-md cursor-pointer`}
            onClick={() => setClick(num)}
          >
            {num}
          </li>
        ))}
      </ul>
    </>
  );
};

export default CommentList;
