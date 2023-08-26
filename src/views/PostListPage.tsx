import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import ScrollTopBtn from "../components/common/ScrollTopBtn";
import LoadPostCard from "../components/skeletonUI/LoadPostCard";

// 실제 서버와 연결할 때는 message가 아닌 정렬 함수가 들어갈 예정!
const sortNames = [
  { name: "최신순", message: "최신순 클릭" },
  { name: "추천순", message: "추천순 클릭" },
  { name: "참여자순", message: "참여자순 클릭" },
];

const clickSort = (message: string) => {
  console.log("클릭 성공!");
  alert(message);
};

const PostListPage = (): JSX.Element => {
  const PostCardList = React.lazy(
    () => import("../components/contents/PostCardList")
  );

  return (
    <>
      <>
        <h1 className="text-2xl font-semibold">투표글</h1>
        <div className="flex justify-between items-center mt-8">
          <ul className="flex items-center gap-4">
            {sortNames.map((sortName) => (
              <li
                key={sortName.name}
                className={`cursor-pointer ${
                  sortName.name === "최신순"
                    ? "text-blue-dark font-semibold"
                    : ""
                }`}
                onClick={() => clickSort(sortName.message)}
              >
                {sortName.name}
              </li>
            ))}
          </ul>

          <Link to="/create" className="font-bold">
            글쓰기
          </Link>
        </div>
        <Suspense fallback={<LoadPostCard limit={10} />}>
          <PostCardList limit={PostCardList.length} />
        </Suspense>
      </>
      <ScrollTopBtn />
    </>
  );
};

export default PostListPage;
