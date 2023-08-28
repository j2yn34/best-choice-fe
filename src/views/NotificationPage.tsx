import { Suspense, lazy } from "react";
import LoadNotification from "../components/skeletonUI/LoadNotification";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "../components/common/ErrorMessage";

const NotificationPage = (): JSX.Element => {
  const NotificationCard = lazy(
    () => import("../components/contents/NotificationCard")
  );

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">채팅방 개설 알림</h1>
        <button>전체 삭제</button>
      </div>
      <ErrorBoundary FallbackComponent={ErrorMessage}>
        <Suspense fallback={<LoadNotification />}>
          <NotificationCard />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default NotificationPage;
