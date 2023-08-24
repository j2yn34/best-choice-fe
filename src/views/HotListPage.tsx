import useFetchData from "../hooks/useFetchData";
import PostCardList from "../components/contents/PostCardList";
import ScrollTopBtn from "../components/common/ScrollTopBtn";

const HotListPage = (): JSX.Element => {
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
        <>
          <h1 className="text-2xl font-semibold">HOT 투표글</h1>
          <PostCardList postData={postData} />
        </>
      )}
      <ScrollTopBtn />
    </>
  );
};

export default HotListPage;
