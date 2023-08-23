import { useParams } from "react-router-dom";
import PostDetail from "../components/contents/PostDetail";
import useFetchData from "../hooks/useFetchData";
import Comment from "../components/contents/Comment";

const PostDetailPage = (): JSX.Element => {
  const {
    isLoading,
    data: commentData,
    isError,
  } = useFetchData("/commentListData", ["commentData"]);

  if (isError) {
    console.log("데이터 불러오기 실패");
  }

  const { postId } = useParams<{ postId?: string }>();

  if (!postId) {
    return <div>페이지를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <PostDetail postId={postId} />
      {isLoading ? "isLoading..." : <Comment commentData={commentData} />}
    </>
  );
};

export default PostDetailPage;
