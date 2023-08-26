import React, { Suspense } from "react";
import LoadNotification from "../components/skeletonUI/LoadNotification";

const NotificationPage = (): JSX.Element => {
  const NotificationCard = React.lazy(
    () => import("../components/NotificationCard")
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">채팅방 개설 알림</h1>
        <button>전체 삭제</button>
      </div>
      <Suspense fallback={<LoadNotification />}>
        <NotificationCard />
      </Suspense>
    </>
  );
};

export default NotificationPage;
