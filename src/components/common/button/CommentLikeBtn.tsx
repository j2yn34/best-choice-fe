import { useEffect, useState } from "react";
import axios from "axios";
import { RiThumbUpLine, RiThumbUpFill } from "react-icons/ri";
import { useRecoilValue } from "recoil";
import { useMutation, useQueryClient } from "react-query";
import { accessTokenState } from "../../../states/recoil";
import AlertModal from "../../modal/AlertModal";

const CommentLikeBtn = ({
  commentId,
  sort,
  likeCount,
  liked,
}: {
  commentId: number | null;
  sort: string;
  likeCount: number;
  liked: boolean;
}): JSX.Element => {
  const [likeInfo, setLikeInfo] = useState({
    isLiked: liked,
    totalLikeCount: likeCount,
  });
  const [showModal, setShowModal] = useState(false);
  const token = useRecoilValue<string>(accessTokenState);
  const queryClient = useQueryClient();

  type LikeInfo = {
    isLiked: boolean;
    totalLikeCount: number;
  };

  const mutation = useMutation(
    async () => {
      const apiUrl = `/api/api/comments/${commentId}`;
      const likeUrl = likeInfo.isLiked ? `${apiUrl}/unlike` : `${apiUrl}/like`;

      await axios({
        method: "post",
        url: likeUrl,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      onMutate: () => {
        queryClient.setQueryData<LikeInfo | undefined>(
          `${sort}CommentData${commentId}`,
          (prev) => {
            if (!prev) return prev;

            return {
              ...prev,
              isLiked: !prev.isLiked,
              totalLikeCount: likeInfo.isLiked
                ? prev.totalLikeCount - 1
                : prev.totalLikeCount + 1,
            };
          }
        );
      },
      onError: (error) => {
        console.error(liked ? "좋아요 취소 실패:" : "좋아요 실패", error);
        queryClient.setQueryData<LikeInfo | undefined>(
          `${sort}CommentData${commentId}`,
          (prev) => {
            if (!prev) return prev;

            return {
              ...prev,
              isLiked: liked,
              totalLikeCount: likeCount,
            };
          }
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries();
      },
    }
  );

  const onLikeClick = () => {
    if (!token) {
      openModal();
      return;
    }
    mutation.mutate();
  };

  useEffect(() => {
    setLikeInfo({
      isLiked: liked,
      totalLikeCount: likeCount,
    });
  }, [liked, likeCount]);

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className="flex items-center min-w-fit">
        <button
          onClick={onLikeClick}
          className={`flex items-center mr-1 shrink-0 hover:text-blue ${
            likeInfo.isLiked ? "text-blue" : ""
          }`}
        >
          <span>
            {likeInfo.isLiked ? <RiThumbUpFill /> : <RiThumbUpLine />}
          </span>
        </button>
        <span>{likeInfo.totalLikeCount}</span>
      </div>
      {showModal && (
        <AlertModal message="로그인 후 이용해 주세요" closeModal={closeModal} />
      )}
    </>
  );
};

export default CommentLikeBtn;
