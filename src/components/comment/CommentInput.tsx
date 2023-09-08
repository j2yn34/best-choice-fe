import { useState, ChangeEvent, FormEvent, useCallback } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../../states/recoil";

const CommentInput = ({ postId }: { postId: string }) => {
  const token = useRecoilValue<string>(accessTokenState);
  const [commentValue, setCommentValue] = useState<string>("");

  const onchangeComment = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setCommentValue(value);
  }, []);

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
        className="flex items-center justify-between gap-2 md:gap-4 w-full bg-color-bg p-3 md:p-5 h-[120px] rounded-lg mt-16"
      >
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
      </form>
    </>
  );
};

export default CommentInput;
