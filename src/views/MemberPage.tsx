import { useCallback, useState } from "react";
import useFetchData from "../hooks/useFetchData";
import PostCardList from "../components/contents/PostCardList";
import ChangeNickname from "../components/modal/ChangeNickname";

const sortNames = [
  { name: "작성한 투표글", message: "작성한 투표글 클릭" },
  { name: "투표한 글", message: "투표한 글 클릭" },
  { name: "추천한 글", message: "추천한 글 클릭" },
  { name: "댓글 단 글", message: "댓글 단 글 클릭" },
];

const MemberPage = (): JSX.Element => {
  const clickSort = useCallback((message: string) => {
    console.log("클릭 성공!");
    alert(message);
  }, []);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

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
          <p className="text-2xl mr-6">
            안녕하세요, <span className="font-semibold">닉네임 </span>님!
          </p>
          <button
            onClick={() => openModal()}
            className="btn btn-sm bg-white rounded-md"
          >
            닉네임 변경
          </button>
        </div>
        <button className="font-bold">로그아웃</button>
      </div>
      <ul className="flex items-center gap-4 mt-8">
        {sortNames.map((sortName) => (
          <li
            key={sortName.name}
            className={`cursor-pointer ${
              sortName.name === "작성한 투표글"
                ? "text-blue-dark font-semibold"
                : ""
            }`}
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
      {showModal ? <ChangeNickname closeModal={closeModal} /> : null}
    </>
  );
};

export default MemberPage;
