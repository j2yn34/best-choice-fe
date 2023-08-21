import NotificationMessage from "../components/NotificationMessage";

const NotificationPage = (): JSX.Element => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">채팅방 개설 알림</h1>
        <button>전체 삭제</button>
      </div>
      <NotificationMessage />
    </>
  );
};

export default NotificationPage;
