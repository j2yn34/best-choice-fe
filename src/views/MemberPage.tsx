import { Suspense, lazy, useState, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import ChangeNickname from "../components/modal/ChangeNickname";
import LoadPostCard from "../components/skeletonUI/LoadPostCard";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "../components/common/ErrorMessage";
import { useRecoilState, useRecoilValue } from "recoil";
import { accessTokenState, userInfoState } from "../states/recoil";
import ScrollTopBtn from "../components/common/button/ScrollTopBtn";
import { UserInfoState } from "../states/recoilType";
import ConfirmModal from "../components/modal/ConfirmModal";

const sortNames = [
  { name: "작성한 투표글", sort: "POSTS" },
  { name: "투표한 글", sort: "CHOICES" },
  { name: "추천한 글", sort: "LIKES" },
  { name: "댓글 단 글", sort: "COMMENTS" },
];

const MemberPage = (): JSX.Element => {
  const [showChangeNicknameModal, setShowChangeNicknameModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [postSort, setPostSort] = useState<string>("POSTS");
  const [token, setToken] = useRecoilState<string>(accessTokenState);
  const userInfo = useRecoilValue<UserInfoState>(userInfoState);
  const nickname = userInfo.nickname;
  const navigate = useNavigate();

  const PostCardList = lazy(
    () => import("../components/contents/PostCardList")
  );

  const LogoutClick = () => {
    setToken("");
    sessionStorage.removeItem("user");
    closeModal(setShowConfirmModal);
    navigate("/");
  };

  const openModal = (setFunc: Dispatch<SetStateAction<boolean>>) => {
    setFunc(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = (setFunc: Dispatch<SetStateAction<boolean>>) => {
    setFunc(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <p className="text-2xl mr-6">
            안녕하세요,
            <span className="font-semibold"> {nickname} </span>
            님!
          </p>
          <button
            onClick={() => openModal(setShowChangeNicknameModal)}
            className="btn btn-sm bg-white rounded-md"
          >
            닉네임 변경
          </button>
        </div>
        <button
          onClick={() => openModal(setShowConfirmModal)}
          className="font-bold"
        >
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
          <PostCardList limit={null} sort={postSort} token={token} />
        </Suspense>
      </ErrorBoundary>
      <ScrollTopBtn />
      {showChangeNicknameModal ? (
        <ChangeNickname
          closeModal={() => closeModal(setShowChangeNicknameModal)}
        />
      ) : null}
      {showConfirmModal && (
        <ConfirmModal
          message="로그아웃 할까요?"
          closeModal={() => closeModal(setShowConfirmModal)}
          confirm={LogoutClick}
        />
      )}
    </>
  );
};

export default MemberPage;
