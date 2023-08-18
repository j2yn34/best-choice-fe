import ScrollTopBtn from "../components/common/ScrollTopBtn";
import PostCardList from "../components/contents/PostCardList";
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
        <PostCardList postData={chatData} title="채팅방" sort={false} />
      )}
      <ScrollTopBtn />
    </>
  );
};

export default ChatListPage;
