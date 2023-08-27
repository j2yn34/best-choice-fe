import { Suspense, lazy } from "react";
import ScrollTopBtn from "../components/common/ScrollTopBtn";
import LoadPostCard from "../components/skeletonUI/LoadPostCard";

const ChatListPage = (): JSX.Element => {
  const ChatCardList = lazy(
    () => import("../components/contents/ChatCardList")
  );

  return (
    <>
      <>
        <h1 className="text-2xl font-semibold">채팅방</h1>
        <Suspense fallback={<LoadPostCard limit={10} />}>
          <ChatCardList />
        </Suspense>
      </>
      <ScrollTopBtn />
    </>
  );
};

export default ChatListPage;
