import { useNavigate, useParams } from "react-router-dom";
import PostDetail from "../components/contents/PostDetail";
import Comment from "../components/comment/Comment";

const PostDetailPage = (): JSX.Element => {
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
      <PostDetail postId={postId} />
      <div className="flex justify-end my-8">
        <button onClick={onClick}>목록으로</button>
      </div>
      <Comment />
    </>
  );
};

export default PostDetailPage;
