import PostCard from "./PostCard";
import { Post } from "../../mocks/mockDatas/postListData";

const PostCardList = ({
  postData,
  title,
}: {
  postData: Post[];
  title: string;
}): JSX.Element => {
  return (
    <div>
      <p className="text-2xl font-semibold">{title}</p>
      <div className="mt-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-x-6 gap-y-8">
          {postData.map((post) => (
            <PostCard Data={post} key={post.postId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCardList;
