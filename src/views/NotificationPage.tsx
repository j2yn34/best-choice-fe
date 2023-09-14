import { Suspense, lazy, useEffect } from "react";
import LoadNotification from "../components/skeletonUI/LoadNotification";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "../components/common/ErrorMessage";
import ScrollTopBtn from "../components/common/button/ScrollTopBtn";
import { newNotificationState } from "../states/recoil";
import { useSetRecoilState } from "recoil";

const NotificationPage = (): JSX.Element => {
  const setNewNotice = useSetRecoilState<boolean>(newNotificationState);

  const NotificationCard = lazy(
    () => import("../components/contents/NotificationCard")
  );

  useEffect(() => {
    setNewNotice(false);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">채팅방 개설 알림</h1>
      </div>
      <ErrorBoundary FallbackComponent={ErrorMessage}>
        <Suspense fallback={<LoadNotification />}>
          <NotificationCard />
        </Suspense>
      </ErrorBoundary>
      <ScrollTopBtn />
    </>
  );
};

export default NotificationPage;
