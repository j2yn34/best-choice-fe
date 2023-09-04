import { useState, useEffect } from "react";
import useFetchData from "../../hooks/useFetchData";
import { useRecoilState } from "recoil";
import { commentLengthState } from "../../states/recoil";
import { Comment } from "../../mocks/mockType";
import LikeBtn from "../common/LikeBtn";
import BasicModal from "../modal/BasicModal";
import NoDataMessage from "../common/NoDataMessage";

const list = [1, 2, 3];

const CommentList = ({ sort }: { sort: string }) => {
  const [click, setClick] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [, setCommentLength] = useRecoilState(commentLengthState);
  // const [page, setPage] = useState<number>(1);

  const { data: commentsData } = useFetchData(
    `/commentListData`,
    [`${sort}CommentData`],
    ""
  );

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
    console.log("댓글 삭제");
  };

  useEffect(() => {
    setCommentLength(commentsData.length);
  }, [commentsData.length, setCommentLength]);

  return (
    <>
      {commentsData["content"].length === 0 ? (
        <NoDataMessage message="아직 작성된 댓글이 없어요" />
      ) : (
        <div>
          {commentsData["content"].map((commentData: Comment) => (
            <div
              key={commentData.commentId}
              className="p-3 md:px-4 md:pb-4 bg-color-bg border-b border-blue-200"
            >
              <div className="flex items-center justify-between">
                <ul className="flex items-center gap-2.5">
                  {commentData.option ? (
                    <li
                      className={`min-w-[24px] min-h-[24px] pl-[7px] rounded-full text-sm md:text-base  ${
                        commentData.option === "A"
                          ? "text-red-dark bg-red-100"
                          : "text-blue-dark bg-blue-100"
                      }`}
                    >
                      {commentData.option}
                    </li>
                  ) : (
                    ""
                  )}

                  <li className="text-sm">{commentData.member.nickname}</li>
                  <li className="text-sm text-gray">
                    {commentData.createdDate}
                  </li>
                  <LikeBtn
                    isComment={true}
                    initialLikeCount={commentData.likeCount}
                  />
                </ul>
                {commentData.commentId === 1 ? (
                  <button className="text-red-dark text-sm" onClick={openModal}>
                    삭제
                  </button>
                ) : (
                  ""
                )}
              </div>
              <p className="mt-4">{commentData.content}</p>
            </div>
          ))}
        </div>
      )}
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
      ) : null}
    </>
  );
};

export default CommentList;
