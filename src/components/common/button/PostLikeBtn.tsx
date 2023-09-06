import { useEffect, useState } from "react";
import axios from "axios";
import { RiThumbUpLine, RiThumbUpFill } from "react-icons/ri";
import { useRecoilValue } from "recoil";
import { useMutation, useQueryClient } from "react-query";
import { accessTokenState } from "../../../states/recoil";

const PostLikeBtn = ({
  postId,
  likeCount,
  liked,
}: {
  postId: number | null;
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
      const apiUrl = `/api/api/posts/${postId}`;
      const likeUrl = likeInfo.isLiked ? `${apiUrl}/unlike` : `${apiUrl}/like`;

      const response = await axios({
        method: "post",
        url: likeUrl,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    {
      onMutate: () => {
        queryClient.setQueryData<LikeInfo | undefined>(
          `postData${postId}`,
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
          `postData${postId}`,
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
        onClick={onLikeClick}
        className={`flex items-center mr-1 hover:text-blue shrink-0 ${
          likeInfo.isLiked ? "text-blue" : ""
        }`}
      >
        <span className="text-sm mr-1">추천</span>
        <span className="text-lg">
          {likeInfo.isLiked ? <RiThumbUpFill /> : <RiThumbUpLine />}
        </span>
      </button>
      <span className="font-semibold">{likeInfo.totalLikeCount}</span>
    </div>
  );
};

export default PostLikeBtn;
