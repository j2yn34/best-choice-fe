import { useEffect, useState } from "react";
import axios from "axios";
import { RiThumbUpLine, RiThumbUpFill } from "react-icons/ri";
import { useRecoilValue } from "recoil";
import { useMutation, useQueryClient } from "react-query";
import { accessTokenState } from "../../../states/recoil";

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
    mutation.mutate();
  };

  useEffect(() => {
    setLikeInfo({
      isLiked: liked,
      totalLikeCount: likeCount,
    });
  }, [liked, likeCount]);

  return (
    <div className="flex items-center min-w-fit">
      <button
        disabled={token ? false : true}
        onClick={onLikeClick}
        className={`flex items-center mr-1 shrink-0 ${
          token ? "hover:text-blue" : ""
        } ${likeInfo.isLiked ? "text-blue" : ""}`}
      >
        <span>{likeInfo.isLiked ? <RiThumbUpFill /> : <RiThumbUpLine />}</span>
      </button>
      <span>{likeInfo.totalLikeCount}</span>
    </div>
  );
};

export default CommentLikeBtn;
