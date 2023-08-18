import ScrollTopBtn from "../components/common/ScrollTopBtn";
import ChatCardList from "../components/contents/ChatCardList";
import useFetchData from "../hooks/useFetchData";

const ChatListPage = (): JSX.Element => {
  const {
    isLoading,
    data: chatData,
    isError,
  } = useFetchData("/activeChatListData", ["chatData"]);

  if (isError) {
    console.log("데이터 불러오기 실패");
  }

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <p className="text-2xl font-semibold">채팅방</p>
          <ChatCardList Data={chatData} />
        </>
      )}
      <ScrollTopBtn />
    </>
  );
};

export default ChatListPage;
