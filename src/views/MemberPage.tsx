import { Suspense, lazy, useState } from "react";
import ChangeNickname from "../components/modal/ChangeNickname";
import LoadPostCard from "../components/skeletonUI/LoadPostCard";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "../components/common/ErrorMessage";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../states/recoil";
import { useNavigate } from "react-router-dom";
// import useFetchData from "../hooks/useFetchData";

const sortNames = [
  { name: "작성한 투표글", sort: "POSTS" },
  { name: "투표한 글", sort: "CHOICES" },
  { name: "추천한 글", sort: "LIKES" },
  { name: "댓글 단 글", sort: "COMMENTS" },
];

const MemberPage = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [postSort, setPostSort] = useState<string>("POSTS");

  const PostCardList = lazy(
    () => import("../components/contents/PostCardList")
  );

  const [token, setToken] = useRecoilState<string>(accessTokenState);
  const navigate = useNavigate();

  const onLogoutClick = () => {
    const ok = confirm("로그아웃 할까요?");
    if (ok) {
      setToken("");
      navigate("/");
      alert("로그아웃 되었어요. 또 만나요!");
    } else return;
  };

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  // const { data: memberData } = useFetchData(
  //   "api/members/mypage",
  //   ["memberData"],
  //   token
  // );

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <p className="text-2xl mr-6">
            안녕하세요,<span className="font-semibold">닉네임 </span>님!
            {/* <span className="font-semibold">${memberData.nickname} </span>님! */}
          </p>
          <button
            onClick={() => openModal()}
            className="btn btn-sm bg-white rounded-md"
          >
            닉네임 변경
          </button>
        </div>
        <button onClick={onLogoutClick} className="font-bold">
          로그아웃
        </button>
      </div>
      <ul className="flex items-center gap-4 mb-7">
        {sortNames.map((sortName) => (
          <li
            key={sortName.name}
            className={`cursor-pointer ${
              sortName.sort === postSort ? "text-blue-dark font-semibold" : ""
            }`}
            onClick={() => setPostSort(sortName.sort)}
            tabIndex={0}
          >
            {sortName.name}
          </li>
        ))}
      </ul>
      <ErrorBoundary FallbackComponent={ErrorMessage}>
        <Suspense fallback={<LoadPostCard limit={2} />}>
          <PostCardList limit={3} sort={postSort} token={token} />
        </Suspense>
      </ErrorBoundary>
      {showModal ? <ChangeNickname closeModal={closeModal} /> : null}
    </>
  );
};

export default MemberPage;
