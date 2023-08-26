import useFetchData from "../../hooks/useFetchData";
import PostCard from "./PostCard";
import { Post } from "../../mocks/mockType";

const PostCardList = (): JSX.Element => {
  const { data: postData, isError } = useFetchData("/postListData", [
    "postData",
  ]);

  if (isError) {
    console.log("데이터 불러오기 실패");
  }

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-x-6 gap-y-8">
        {postData.slice(0, 4).map((post: Post) => (
          <PostCard Data={post} key={post.postId} />
        ))}
      </div>
    </div>
  );
};

export default PostCardList;
