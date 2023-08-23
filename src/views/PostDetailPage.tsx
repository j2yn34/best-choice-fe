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

  return (
    <>{isLoading ? "isLoading..." : <Comment commentData={commentData} />}</>
  );
};

export default PostDetailPage;
