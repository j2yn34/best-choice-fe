import PostCard from "./PostCard";
import { Post } from "../../mocks/mockType";

const PostCardList = ({ postData }: { postData: Post[] }): JSX.Element => {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-x-6 gap-y-8">
        {postData.map((post) => (
          <PostCard Data={post} key={post.postId} />
        ))}
      </div>
    </div>
  );
};

export default PostCardList;
