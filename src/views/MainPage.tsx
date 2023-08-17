import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Post } from "../mocks/mockDatas/activeChatListData";
import MainChattingList from "../components/MainChattingList";
import PostCardList from "../components/contents/PostCardList";

const MainPage = (): JSX.Element => {
  const [postData, setPostData] = useState<Post[]>([]);

  const getData = async () => {
    const response = await axios.get("/postListData");
    const data = response.data["content"];
    setPostData(data);
  };

  useEffect(() => {
    getData();
  }, []);

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
        <PostCardList postData={postData.slice(0, 4)} title="HOT 투표글" />
        <div className="mt-10 text-end">
          <Link to="/hot">HOT글 더 보러가기 &gt;</Link>
        </div>
      </div>

      <div className="mt-20">
        <PostCardList
          postData={postData.slice(4, 8)}
          title="새로 올라온 투표글"
        />
        <div className="mt-10 text-end">
          <Link to="/posts">투표글 더 보러가기 &gt;</Link>
        </div>
      </div>
    </>
  );
};

export default MainPage;
