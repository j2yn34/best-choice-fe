import { FormEvent, useState } from "react";
import {
  Dispatch,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import useFetchData from "../../hooks/useFetchData";
import LikeBtn from "../common/LikeBtn";
import VoteGraph from "./VoteGraph";
import BasicModal from "../modal/BasicModal";
import NoDataMessage from "../common/NoDataMessage";
import moment from "moment";
import { useRecoilValue } from "recoil";
import { accessTokenState, userInfoState } from "../../states/recoil";
import { UserInfoState } from "../../states/recoilType";

const PostDetail = ({ postId }: { postId: string }): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | null>(null);
  const [votedOption, setVotedOption] = useState<"A" | "B" | null>(null);
  const [isVoted, setIsVoted] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const token = useRecoilValue<string>(accessTokenState);
  const userInfo = useRecoilValue<UserInfoState>(userInfoState);
  const memberId = userInfo.memberId;

  const navigate = useNavigate();

  const { data: postData } = useFetchData(
    `/api/posts/${postId}`,
    [`postData${postId}`],
    token
  );

  if (postData === 0) {
    return <NoDataMessage message="해당하는 투표글이 없어요" />;
  }

  const safeContent = DOMPurify.sanitize(postData.content);

  const handleOptionChange = (option: "A" | "B") => {
    setSelectedOption(option);
  };

  const handleVoteSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedOption) {
      // alret 띄우면 새로고침 돼서 카운트 반영 안 됨 -> 임시로 console.log로 작성
      console.log(
        `${
          selectedOption === "A"
            ? "A " + postData.optionA
            : "B " + postData.optionB
        }에 투표했어요!`
      );
      // 임시로 직접 카운트 증가시킴
      if (selectedOption === "A") {
        postData.ACount++;
      } else if (selectedOption === "B") {
        postData.BCount++;
      }
      setVotedOption(selectedOption);
      setIsVoted(true);
      // 실제로는 투표 데이터 post 전송 (`/api/posts/${postId}/`, {"option": selectedOption})
    } else {
      alert("투표할 항목을 선택해 주세요.");
      return;
    }
  };

  const handleVoteBtnClick = (e: FormEvent) => {
    handleVoteSubmit(e);
  };

  const openModal = (setFunc: Dispatch<SetStateAction<boolean>>) => {
    setFunc(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = (setFunc: Dispatch<SetStateAction<boolean>>) => {
    setFunc(false);
    document.body.style.overflow = "auto";
  };

  const onReport = () => {
    openModal(setShowReportModal);
  };

  const onDelete = () => {
    openModal(setShowDeleteModal);
  };

  const deletePost = async () => {
    try {
      await axios({
        method: "delete",
        url: `/api/api/posts/${postId}`,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(-1);
    } catch (error) {
      console.error("게시글 삭제 실패: ", error);
    }
    setShowDeleteModal(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className="w-full bg-white rounded-xl px-4 sm:px-6 md:px-[70px] py-4">
        <div className="flex justify-end">
          {memberId === postData.member.memberId ? (
            <button className="text-red-dark text-sm" onClick={onDelete}>
              삭제
            </button>
          ) : (
            <button className="text-red-dark text-sm" onClick={onReport}>
              신고
            </button>
          )}
        </div>
        <div className="flex flex-wrap justify-between items-center pb-2 sm:py-2 px-2 border-b border-blue-200">
          <h2 className="text-lg sm:text-xl mr-2 sm:mr-4">{postData.title}</h2>
          <div className="text-sm text-gray">
            <span className="mr-4">{postData.member.nickname}</span>
            <span>{moment(postData.createdDate).format("YYYY.MM.DD")}</span>
          </div>
        </div>

        <div className="pt-4">
          <div className="px-2">
            <div className="min-h-[80px]">
              {/* <div className="pb-4">
              <div>사진</div>
            </div> */}
              <div className="pb-6">{parse(safeContent)}</div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2 flex-wrap mr-1">
                {postData.tags.map((tag: string, index: number) => (
                  <div
                    key={index}
                    className="badge badge-lg py-3.5 bg-blue-100/[0.2] border-blue-300 text-blue"
                  >
                    #{tag}
                  </div>
                ))}
              </div>
              <LikeBtn
                isComment={false}
                initialLikeCount={postData.likeCount}
              />
            </div>
          </div>

          <form
            id="vote"
            onSubmit={handleVoteSubmit}
            className="flex flex-col mb-4 p-2 border-2 border-blue-200 rounded-xl"
          >
            <label
              className={`flex items-center p-4 mb-1 w-full rounded-xl ${
                selectedOption === "A" ? "text-red-dark bg-blue-100/[0.5]" : ""
              } ${
                votedOption === "B" ? "hover:text-black" : "hover:text-red-dark"
              } ${isVoted ? "cursor-auto" : "cursor-pointer"}`}
            >
              <input
                type="radio"
                name="option"
                value="A"
                disabled={isVoted ? true : false}
                checked={selectedOption === "A"}
                onChange={() => handleOptionChange("A")}
              />
              <span className="font-semibold mx-3">A</span>
              <span>{postData.optionA}</span>
            </label>
            <label
              className={`flex items-center p-4 mb-1 w-full rounded-xl ${
                selectedOption === "B" ? "text-blue-dark bg-blue-100/[0.5]" : ""
              } ${
                votedOption === "A"
                  ? "hover:text-black"
                  : "hover:text-blue-dark"
              } ${isVoted ? "cursor-auto" : "cursor-pointer"}`}
            >
              <input
                type="radio"
                name="option"
                value="B"
                disabled={isVoted ? true : false}
                checked={selectedOption === "B"}
                onChange={() => handleOptionChange("B")}
              />
              <span className="font-semibold mx-3">B</span>
              <span>{postData.optionB}</span>
            </label>
          </form>

          <div className="w-full bg-color-bg/[0.6] rounded-xl my-4 px-4 pb-3">
            <VoteGraph ACount={postData.acount} BCount={postData.bcount} />
          </div>

          <div className="flex flex-col items-center justify-center pt-4 mb-4">
            <span className="text-sm mb-2.5">지금 채팅 중인 투표글이에요!</span>
            <div className="flex gap-4">
              <button
                id="vote"
                type="button"
                disabled={isVoted ? true : false}
                onClick={handleVoteBtnClick}
                className={`btn bg-white text-black-primary hover:bg-blue-100/[0.5] ${
                  isVoted ? "disabled-btn" : ""
                }`}
              >
                투표하기
              </button>
              <button className="btn bg-black-primary text-white hover:bg-black">
                채팅방 입장하기
              </button>
            </div>
          </div>
        </div>
      </div>
      {showReportModal ? (
        <BasicModal
          message="해당 투표글을 신고 할까요?"
          closeModal={() => closeModal(setShowReportModal)}
          confirm={() => closeModal(setShowReportModal)}
        />
      ) : null}
      {showDeleteModal ? (
        <BasicModal
          message="해당 투표글을 삭제 할까요?"
          closeModal={() => closeModal(setShowDeleteModal)}
          confirm={deletePost}
        />
      ) : null}
    </>
  );
};

export default PostDetail;
