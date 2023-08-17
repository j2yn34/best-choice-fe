import useFetchData from "../hooks/useFetchData";
import PostCardList from "../components/contents/PostCardList";

const PostListPage = (): JSX.Element => {
  const {
    isLoading,
    data: postData,
    isError,
  } = useFetchData("/postListData", ["postData"]);

  if (isError) {
    console.log("데이터 불러오기 실패");
  }

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <PostCardList postData={postData} title="투표글" sort={true} />
      )}
    </>
  );
};

export default PostListPage;
