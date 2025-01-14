import { useState, useEffect } from "react";
import axios from "axios";
import useFetchData from "../../hooks/useFetchData";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  commentLengthState,
  userInfoState,
  accessTokenState,
} from "../../states/recoil";
import { Comment } from "../../mocks/mockType";
import ConfirmModal from "../modal/ConfirmModal";
import NoDataMessage from "../common/NoDataMessage";
import moment from "moment";
import CommentLikeBtn from "../common/button/CommentLikeBtn";
import Pagination from "react-js-pagination";

const CommentList = ({ sort, postId }: { sort: string; postId: string }) => {
  const token = useRecoilValue<string>(accessTokenState);
  const [page, setPage] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [commentLength, setCommentLength] = useRecoilState(commentLengthState);
  const [userData] = useRecoilState(userInfoState);
  const [commentId, setCommentId] = useState<number | null>(null);

  const { data: commentsData } = useFetchData(
    `/api/posts/${postId}/comments?page=${page}&sort=${sort}`,
    [`${sort}CommentData${postId}-${page}`],
    token
  );

  const movePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const openModal = (commentId: number) => {
    setShowModal(true);
    setCommentId(commentId);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  const deleteComment = async () => {
    try {
      await axios({
        method: "delete",
        url: `/api/api/comments/${commentId}`,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      location.reload();
    } catch (error) {
      console.error("Error sending data: ", error);
    }
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    setCommentLength(commentsData.totalElements);
  }, [commentsData, setCommentLength]);

  return (
    <>
      {commentsData["content"].length <= 0 ? (
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
                      className={`min-w-[24px] min-h-[24px] pl-[7.5px] pt-[1.5px] rounded-full text-sm md:text-base  ${
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
                    {moment(commentData.createdDate).format(
                      "YYYY.MM.DD  HH:mm"
                    )}
                  </li>
                  <CommentLikeBtn
                    commentId={commentData.commentId}
                    sort={sort}
                    likeCount={commentData.likeCount}
                    liked={commentData.liked ? true : false}
                  />
                </ul>
                {token && userData.memberId === commentData.member.memberId && (
                  <button
                    className="text-red-dark text-sm"
                    onClick={() => openModal(commentData.commentId)}
                  >
                    삭제
                  </button>
                )}
              </div>
              <p className="mt-4">
                {commentData.content.split("\n").map((commentLine, index) => (
                  <span key={index}>
                    {commentLine}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          ))}
          <Pagination
            activePage={page + 1}
            totalItemsCount={commentLength}
            pageRangeDisplayed={5}
            onChange={(pageNumber) => movePage(pageNumber - 1)}
          />
        </div>
      )}
      {showModal && (
        <ConfirmModal
          message="댓글을 삭제할까요?"
          closeModal={closeModal}
          confirm={deleteComment}
        />
      )}
    </>
  );
};

export default CommentList;
