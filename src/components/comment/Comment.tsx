// api/posts/{postId}/comments?page=1&sort=type -> 실제 서버 요청
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import { useCallback } from "react";
import useFetchData from "../../hooks/useFetchData";

const sortNames = [
  { name: "최신순", message: "최신순 클릭" },
  { name: "추천순", message: "추천순 클릭" },
];

const Comment = (): JSX.Element => {
  const { data: commentData, isError } = useFetchData("/commentListData", [
    "commentData",
  ]);

  if (isError) {
    console.log("데이터 불러오기 실패");
  }

  const clickSort = useCallback((message: string) => {
    console.log("클릭 성공!");
    alert(message);
  }, []);

  return (
    <div className="w-full py-8 px-4 sm:px-6 md:pt-10 md:px-[70px] bg-white rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <p className="text-lg">댓글 {commentData.length}개</p>
        <ul className="flex items-center gap-4">
          {sortNames.map((sortName) => (
            <li
              key={sortName.name}
              className={`cursor-pointer text-sm ${
                sortName.name === "최신순" ? "text-blue-dark font-semibold" : ""
              }`}
              onClick={() => {
                clickSort(sortName.message);
              }}
            >
              {sortName.name}
            </li>
          ))}
        </ul>
      </div>
      <CommentList commentData={commentData} />
      <CommentInput />
    </div>
  );
};

export default Comment;
