import { useNavigate, useParams } from "react-router-dom";
import PostDetail from "../components/contents/PostDetail";
import useFetchData from "../hooks/useFetchData";
import Comment from "../components/contents/Comment";

const PostDetailPage = (): JSX.Element => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/posts");
  };

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
      <div className="flex justify-end my-8">
        <button onClick={onClick}>목록으로</button>
      </div>
      {isLoading ? "isLoading..." : <Comment commentData={commentData} />}
    </>
  );
};

export default PostDetailPage;
