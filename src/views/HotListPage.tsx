import { Suspense, lazy } from "react";
import ScrollTopBtn from "../components/common/ScrollTopBtn";
import LoadPostCard from "../components/skeletonUI/LoadPostCard";

const HotListPage = (): JSX.Element => {
  const PostCardList = lazy(
    () => import("../components/contents/PostCardList")
  );

  return (
    <>
      <>
        <h1 className="text-2xl font-semibold">HOT 투표글</h1>
        <Suspense fallback={<LoadPostCard limit={10} />}>
          <PostCardList limit={PostCardList.length} />
        </Suspense>
      </>
      <ScrollTopBtn />
    </>
  );
};

export default HotListPage;
