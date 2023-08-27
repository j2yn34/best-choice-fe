import { Suspense, lazy } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/comment/Comment";
import LoadPostDetail from "../components/skeletonUI/LoadPostDetail";

const PostDetailPage = (): JSX.Element => {
  const PostDetail = lazy(() => import("../components/contents/PostDetail"));

  const navigate = useNavigate();

  const onClick = () => {
    navigate("/posts");
  };

  const { postId } = useParams<{ postId?: string }>();

  if (!postId) {
    return <div>페이지를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-8">투표글</h1>
      <Suspense fallback={<LoadPostDetail />}>
        <PostDetail postId={postId} />
      </Suspense>
      <div className="flex justify-end my-8">
        <button onClick={onClick}>목록으로</button>
      </div>
      <Comment />
    </>
  );
};

export default PostDetailPage;
