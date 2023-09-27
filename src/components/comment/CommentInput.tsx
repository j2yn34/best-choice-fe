import { useState, ChangeEvent, FormEvent, useCallback } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { accessTokenState, userInfoState } from "../../states/recoil";
import useFetchData from "../../hooks/useFetchData";

const CommentInput = ({ postId }: { postId: string }) => {
  const token = useRecoilValue<string>(accessTokenState);
  const userData = useRecoilValue(userInfoState);
  const [commentValue, setCommentValue] = useState<string>("");

  const onchangeComment = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setCommentValue(value);
  }, []);

  const { data: userChoice } = useFetchData(
    `/api/posts/${postId}`,
    [`postData${postId}`],
    token
  );

  const addComment = async () => {
    try {
      await axios({
        method: "post",
        url: `/api/api/posts/${postId}/comments`,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          content: commentValue,
        },
      });
    } catch (error) {
      console.error("Error sending data: ", error);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addComment();
    setCommentValue("");
    location.reload();
  };

  return (
    <>
      <form
        onSubmit={(e) => onSubmit(e)}
        className="w-full bg-color-bg p-4 md:p-5 min-h-[120px] rounded-lg mt-16"
      >
        {token && (
          <ul className="flex items-center gap-2.5">
            {userChoice.myChoice && (
              <li
                className={`min-w-[24px] min-h-[24px] pl-[7.5px] pt-[1.5px] rounded-full text-sm md:text-base  ${
                  userChoice.myChoice === "A"
                    ? "text-red-dark bg-red-100"
                    : "text-blue-dark bg-blue-100"
                }`}
              >
                {userChoice.myChoice}
              </li>
            )}
            <li className="text-sm text-gray">{userData.nickname}</li>
          </ul>
        )}
        <div className="flex items-center justify-between gap-2 md:gap-4 mt-3">
          <textarea
            value={commentValue}
            placeholder={
              token ? `댓글을 입력해 주세요.` : `로그인 후 이용해 주세요.`
            }
            className="w-full h-full p-4 focus:outline-none bg-white"
            onChange={(e) => onchangeComment(e)}
            required
            disabled={!token}
          ></textarea>
          <button
            className={`btn md:px-5 bg-black-primary hover:bg-black text-white ${
              !token && "opacity-30"
            }`}
            disabled={!token}
          >
            확인
          </button>
        </div>
      </form>
    </>
  );
};

export default CommentInput;
