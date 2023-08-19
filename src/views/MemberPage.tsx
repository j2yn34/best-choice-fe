import useFetchData from "../hooks/useFetchData";
import PostCardList from "../components/contents/PostCardList";

const sortNames = [
  { name: "작성한 투표글", message: "작성한 투표글 클릭" },
  { name: "투표한 글", message: "투표한 글 클릭" },
  { name: "추천한 글", message: "추천한 글 클릭" },
  { name: "댓글 단 글", message: "댓글 단 글 클릭" },
];

const clickSort = (message: string) => {
  console.log("클릭 성공!");
  alert(message);
};

const MemberPage = (): JSX.Element => {
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
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <p className="text-[28px] mr-6">
            안녕하세요, <span className="font-semibold">닉네임 </span>님!
          </p>
          <button className="bg-white px-3 py-[10px] rounded-md border border-black border-1">
            닉네임 변경
          </button>
        </div>
        <p className="cursor-pointer" tabIndex={0}>
          로그아웃
        </p>
      </div>
      <ul className="flex items-center gap-5 mt-8">
        {sortNames.map((sortName) => (
          <li
            key={sortName.name}
            className="cursor-pointer"
            onClick={() => clickSort(sortName.message)}
            tabIndex={0}
          >
            {sortName.name}
          </li>
        ))}
      </ul>
      {isLoading ? (
        "isLoading..."
      ) : (
        <div className="mt-8">
          <PostCardList postData={postData.slice(0, 3)} />
        </div>
      )}
    </>
  );
};

export default MemberPage;
