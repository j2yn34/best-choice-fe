import useFetchData from "../../hooks/useFetchData";
import PostCard from "./PostCard";
import { Post } from "../../mocks/mockType";
import NoDataMessage from "../common/NoDataMessage";

const PostCardList = ({
  limit,
  sort,
  token,
}: {
  limit: number | null;
  sort: string | null;
  token: string | null;
}): JSX.Element => {
  // const [page, setPage] = useState<number>(1);

  const url = token
    ? `/api/api/posts/my?sort=${sort}&page=0`
    : `/api/posts?sort=${sort}&page=0`;
  const key = token ? `${sort}myPostData` : `${sort}PostData`;
  const auth = token ? token : "";

  const { data: postData } = useFetchData(url, [key], auth);

  if (postData["content"].length <= 0) {
    return (
      <>
        <NoDataMessage message="투표글 데이터가 없어요" />
        {/* <button onClick={() => setPage(page + 1)}>page ++</button> */}
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-x-6 gap-y-8">
      {limit === null
        ? postData["content"].map((post: Post) => (
            <PostCard Data={post} key={post.postId} />
          ))
        : postData["content"]
            .slice(0, limit)
            .map((post: Post) => <PostCard Data={post} key={post.postId} />)}
    </div>
  );
};

export default PostCardList;
