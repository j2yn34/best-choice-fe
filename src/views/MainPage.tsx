import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import LoadMainChat from "../components/skeletonUI/LoadMainChat";
import LoadPostCard from "../components/skeletonUI/LoadPostCard";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "../components/common/ErrorMessage";
import ScrollTopBtn from "../components/common/button/ScrollTopBtn";

const MainPage = (): JSX.Element => {
  const MainChattingList = lazy(
    () => import("../components/contents/MainChattingList")
  );
  const PostCardList = lazy(
    () => import("../components/contents/PostCardList")
  );

  return (
    <>
      <section>
        <h1 className="text-2xl font-semibold mb-8">진행 중인 채팅방</h1>
        <ErrorBoundary FallbackComponent={ErrorMessage}>
          <Suspense fallback={<LoadMainChat />}>
            <MainChattingList />
          </Suspense>
        </ErrorBoundary>
        <div className="mt-10 text-end">
          <Link to="/chat">채팅방 더 보러가기 &gt;</Link>
        </div>
      </section>

      <section className="mt-20">
        <h1 className="text-2xl font-semibold mb-8">HOT한 투표글</h1>
        <ErrorBoundary FallbackComponent={ErrorMessage}>
          <Suspense fallback={<LoadPostCard limit={4} />}>
            <PostCardList limit={4} sort="HOT" token={""} />
          </Suspense>
        </ErrorBoundary>
        <div className="mt-10 text-end">
          <Link to="/hot">HOT글 더 보러가기 &gt;</Link>
        </div>
      </section>

      <section className="mt-20">
        <h1 className="text-2xl font-semibold mb-8">새로 올라온 투표글</h1>
        <ErrorBoundary FallbackComponent={ErrorMessage}>
          <Suspense fallback={<LoadPostCard limit={4} />}>
            <PostCardList limit={4} sort="LATEST" token={""} />
          </Suspense>
        </ErrorBoundary>
        <div className="mt-10 text-end">
          <Link to="/posts">투표글 더 보러가기 &gt;</Link>
        </div>
      </section>
      <ScrollTopBtn />
    </>
  );
};

export default MainPage;
