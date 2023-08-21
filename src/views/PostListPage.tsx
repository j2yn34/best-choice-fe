import { Link } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import PostCardList from "../components/contents/PostCardList";
import ScrollTopBtn from "../components/common/ScrollTopBtn";

// 실제 서버와 연결할 때는 message가 아닌 정렬 함수가 들어갈 예정!
const sortNames = [
  { name: "최신순", message: "최신순 클릭" },
  { name: "추천순", message: "추천순 클릭" },
  { name: "참여자순", message: "참여자순 클릭" },
];

const clickSort = (message: string) => {
  console.log("클릭 성공!");
  alert(message);
};

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
        <>
          <p className="text-2xl font-semibold">투표글</p>
          <div className="flex justify-between items-center mt-8">
            <ul className="flex items-center gap-5">
              {sortNames.map((sortName) => (
                <li
                  key={sortName.name}
                  className={`cursor-pointer ${
                    sortName.name === "최신순"
                      ? "text-blue-dark font-semibold"
                      : ""
                  }`}
                  onClick={() => clickSort(sortName.message)}
                >
                  {sortName.name}
                </li>
              ))}
            </ul>

            <Link to="/create" className="font-bold">
              글쓰기
            </Link>
          </div>
          <PostCardList postData={postData}></PostCardList>
        </>
      )}
      <ScrollTopBtn />
    </>
  );
};

export default PostListPage;
