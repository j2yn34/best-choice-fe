import { useState } from "react";
import { Comment } from "../../mocks/mockType";
import LikeBtn from "../common/LikeBtn";
import BasicModal from "../modal/BasicModal";

const list = [1, 2, 3];

const CommentList = ({ commentData }: { commentData: Comment[] }) => {
  const [click, setClick] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
    console.log("댓글 삭제");
  };

  return (
    <>
      {commentData.map((comment) => (
        <div
          key={comment.commentId}
          className="p-3 md:px-4 md:pb-4 bg-color-bg border-b border-blue-200"
        >
          <div className="flex items-center justify-between">
            <ul className="flex items-center gap-2.5">
              {comment.option ? (
                <li
                  className={`min-w-[24px] min-h-[24px] pl-[7px] rounded-full text-sm md:text-base  ${
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

              <li className="text-sm">{comment.member.nickname}</li>
              <li className="text-sm text-gray">{comment.createdDate}</li>
              <LikeBtn isComment={true} initialLikeCount={comment.likeCount} />
            </ul>
            {comment.commentId === 1 ? (
              <button className="text-red-dark text-sm" onClick={openModal}>
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
            className={`text-base px-3 py-1 ${
              num === click ? "bg-blue-100" : ""
            } rounded-md cursor-pointer`}
            onClick={() => setClick(num)}
          >
            {num}
          </li>
        ))}
      </ul>
      {showModal ? (
        <BasicModal message="댓글을 삭제할까요?" closeModal={closeModal} />
      ) : (
        ""
      )}
    </>
  );
};

export default CommentList;
