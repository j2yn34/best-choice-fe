import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Comment } from "../../mocks/mockType";

const CommentInput = () => {
  // 임시 state
  const [commentValue, setCommentValue] = useState<Comment>({
    commentId: 12345,
    member: { memberId: 12345, nickname: "test" },
    option: "T",
    content: "",
    createdDate: "테스트용",
    deletedDate: null,
    likeCount: 0,
  });

  const onchangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setCommentValue((prevInputValues) => ({
      ...prevInputValues,
      content: value,
    }));
  };

  // 임시 post
  const queryClient = useQueryClient();

  const addComment = (commentValue: Comment) => {
    return axios.post("/commentListData", commentValue);
  };

  const {
    mutate: addCommentData,
    isLoading,
    isError,
  } = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("commentData");
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCommentData(commentValue);

    const CleanCommentValue = { ...commentValue };
    CleanCommentValue.content = "";
    setCommentValue(CleanCommentValue);
  };

  return (
    <>
      <form
        onSubmit={(e) => onSubmit(e)}
        className="flex items-center justify-between gap-2 md:gap-4 w-full bg-color-bg p-3 md:p-5 h-[120px] rounded-lg mt-16"
      >
        <textarea
          value={commentValue.content}
          placeholder="댓글을 입력해 주세요."
          className="w-full h-full p-4 focus:outline-none"
          onChange={(e) => onchangeComment(e)}
          required
        ></textarea>
        <button className="btn md:px-5 bg-black-primary hover:bg-black text-white">
          확인
        </button>
      </form>
    </>
  );
};

export default CommentInput;
