import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import LoadMainChat from "../components/skeletonUI/LoadMainChat";
import LoadPostCard from "../components/skeletonUI/LoadPostCard";

const MainPage = (): JSX.Element => {
  const MainChattingList = React.lazy(
    () => import("../components/contents/MainChattingList")
  );
  const PostCardList = React.lazy(
    () => import("../components/contents/PostCardList")
  );

  return (
    <>
      <section>
        <h1 className="text-2xl font-semibold mb-8">진행 중인 채팅방</h1>
        <Suspense fallback={<LoadMainChat />}>
          <MainChattingList />
        </Suspense>
        <div className="mt-10 text-end">
          <Link to="/chat">채팅방 더 보러가기 &gt;</Link>
        </div>
      </section>

      <section className="mt-20">
        <h1 className="text-2xl font-semibold">HOT한 투표글</h1>
        <Suspense fallback={<LoadPostCard />}>
          <PostCardList />
        </Suspense>
        <div className="mt-10 text-end">
          <Link to="/hot">HOT글 더 보러가기 &gt;</Link>
        </div>
      </section>

      <section className="mt-20">
        <h1 className="text-2xl font-semibold">새로 올라온 투표글</h1>
        <Suspense fallback={<LoadPostCard />}>
          <PostCardList />
        </Suspense>
        <div className="mt-10 text-end">
          <Link to="/posts">투표글 더 보러가기 &gt;</Link>
        </div>
      </section>
    </>
  );
};

export default MainPage;
