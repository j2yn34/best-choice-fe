import useFetchData from "../../hooks/useFetchData";
import PostCard from "./PostCard";
import { Post } from "../../mocks/mockType";
import NoDataMessage from "../common/NoDataMessage";

const PostCardList = ({ limit }: { limit: number }): JSX.Element => {
  const { data: postData } = useFetchData("/postListData", ["postData"]);

  if (postData.length === 0) {
    return <NoDataMessage message="투표글 데이터가 없어요" />;
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-x-6 gap-y-8">
      {postData.slice(0, limit).map((post: Post) => (
        <PostCard Data={post} key={post.postId} />
      ))}
    </div>
  );
};

export default PostCardList;
