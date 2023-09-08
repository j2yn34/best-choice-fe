import { useState, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import { useRecoilState } from "recoil";
import { commentLengthState } from "../../states/recoil";
import ErrorMessage from "../common/ErrorMessage";

const sortNames = [
  { name: "날짜순", sort: "LATEST" },
  { name: "추천순", sort: "LIKES" },
];

const Comment = ({ postId }: { postId: string }): JSX.Element => {
  const [commentSort, setCommentSort] = useState<string>("LATEST");
  const [commentLength] = useRecoilState(commentLengthState);

  return (
    <div className="w-full py-8 px-4 sm:px-6 md:pt-10 md:px-[70px] bg-white rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <p className="text-lg">댓글 ({commentLength})</p>
        <ul className="flex items-center gap-4">
          {sortNames.map((sortName) => (
            <li
              key={sortName.sort}
              className={`cursor-pointer text-sm ${
                sortName.sort === commentSort && "text-blue-dark font-semibold"
              }`}
              onClick={() => setCommentSort(sortName.sort)}
            >
              {sortName.name}
            </li>
          ))}
        </ul>
      </div>
      <ErrorBoundary FallbackComponent={ErrorMessage}>
        <Suspense
          fallback={
            <span className="flex mx-auto loading loading-spinner loading-md text-gray/[0.2]"></span>
          }
        >
          <CommentList sort={commentSort} postId={postId} />
        </Suspense>
      </ErrorBoundary>
      <CommentInput postId={postId} />
    </div>
  );
};

export default Comment;
