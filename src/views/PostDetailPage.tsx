import { useParams } from "react-router-dom";
import PostDetail from "../components/contents/PostDetail";

const PostDetailPage = (): JSX.Element => {
  const { postId } = useParams<{ postId?: string }>();

  if (!postId) {
    return <div>페이지를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <PostDetail postId={postId} />
    </>
  );
};

export default PostDetailPage;
