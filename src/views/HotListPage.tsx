import { Suspense, lazy } from "react";
import ScrollTopBtn from "../components/common/button/ScrollTopBtn";
import LoadPostCard from "../components/skeletonUI/LoadPostCard";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "../components/common/ErrorMessage";

const HotListPage = (): JSX.Element => {
  const PostCardList = lazy(
    () => import("../components/contents/PostCardList")
  );

  return (
    <>
      <>
        <h1 className="text-2xl font-semibold mb-8">HOT 투표글</h1>
        <ErrorBoundary FallbackComponent={ErrorMessage}>
          <Suspense fallback={<LoadPostCard limit={10} />}>
            <PostCardList limit={null} sort="HOT" token={""} />
          </Suspense>
        </ErrorBoundary>
      </>
      <ScrollTopBtn />
    </>
  );
};

export default HotListPage;
