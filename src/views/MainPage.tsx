import { Link } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import MainChattingList from "../components/MainChattingList";
import PostCardList from "../components/contents/PostCardList";

const MainPage = (): JSX.Element => {
  const {
    isLoading,
    data: postData,
    isError,
  } = useFetchData("/postListData", ["postData"]);

  if (isError) {
    console.log("데이터 불러오기 실패");
  }

  return (
    <>
      <div>
        <div className="text-2xl font-semibold mb-8">진행 중인 채팅방</div>
        <MainChattingList />
        <div className="mt-10 text-end">
          <Link to="/chat">채팅방 더 보러가기 &gt;</Link>
        </div>
      </div>

      <div className="mt-20">
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            <PostCardList
              postData={postData.slice(0, 4)}
              title="HOT 투표글"
              sort={false}
            />
            <div className="mt-10 text-end">
              <Link to="/hot">HOT글 더 보러가기 &gt;</Link>
            </div>
          </>
        )}
      </div>

      <div className="mt-20">
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            <PostCardList
              postData={postData.slice(4, 8)}
              title="새로 올라온 투표글"
              sort={false}
            />
            <div className="mt-10 text-end">
              <Link to="/posts">투표글 더 보러가기 &gt;</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MainPage;
