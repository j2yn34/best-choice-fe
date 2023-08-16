import { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "../mocks/mockDatas/postListData";
import PostCardList from "../components/contents/PostCardList";

// postListData로 HOT 게시글 불러오기 -> 임의로

const HotListPage = (): JSX.Element => {
  const [postData, setPostData] = useState<Post[]>([]);

  const getData = async () => {
    const response = await axios.get("/postListData");
    const data = response.data["content"];
    setPostData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return <PostCardList postData={postData} title="HOT 투표글" />;
};

export default HotListPage;
