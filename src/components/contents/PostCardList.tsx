import useFetchData from "../../hooks/useFetchData";
import PostCard from "./PostCard";
import { Post } from "../../mocks/mockType";

const PostCardList = ({ limit }: { limit: number }): JSX.Element => {
  const { data: postData } = useFetchData("/postListData", ["postData"]);

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-x-6 gap-y-8">
        {postData.slice(0, limit).map((post: Post) => (
          <PostCard Data={post} key={post.postId} />
        ))}
      </div>
    </div>
  );
};

export default PostCardList;
