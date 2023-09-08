import { Suspense, lazy } from "react";
import ScrollTopBtn from "../components/common/button/ScrollTopBtn";
import LoadPostCard from "../components/skeletonUI/LoadPostCard";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "../components/common/ErrorMessage";

const ChatListPage = (): JSX.Element => {
  const ChatCardList = lazy(
    () => import("../components/contents/ChatCardList")
  );

  return (
    <>
      <>
        <h1 className="text-2xl font-semibold mb-8">채팅방</h1>
        <ErrorBoundary FallbackComponent={ErrorMessage}>
          <Suspense fallback={<LoadPostCard limit={10} />}>
            <ChatCardList />
          </Suspense>
        </ErrorBoundary>
      </>
      <ScrollTopBtn />
    </>
  );
};

export default ChatListPage;
