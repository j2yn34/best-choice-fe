import { FormEvent, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { Post } from "../../mocks/mockType";
import LikeBtn from "../common/LikeBtn";
import VoteGraph from "./VoteGraph";
import BasicModal from "../modal/BasicModal";

const PostDetail = ({ postId }: { postId: string }): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<
    "optionA" | "optionB" | null
  >(null);
  const [votedOption, setVotedOption] = useState<"optionA" | "optionB" | null>(
    null
  );
  const [isVoted, setIsVoted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
    console.log("게시글 신고 삭제");
  };

  const { data: postData, isError } = useFetchData("/postListData", [
    "postData",
  ]);

  if (isError) {
    throw new Error("데이터 불러오기 실패");
  }

  const filteredPostData = postData.filter(
    (data: Post) => data.postId === parseInt(postId)
  );
  if (filteredPostData.length === 0) {
    return <p>해당하는 투표글이 없습니다.</p>;
  }
  const viewData = filteredPostData[0];

  const handleOptionChange = (option: "optionA" | "optionB") => {
    setSelectedOption(option);
  };

  const handleVoteSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedOption) {
      // alret 띄우면 새로고침 돼서 카운트 반영 안 됨 -> 임시로 console.log로 작성
      console.log(
        `${
          selectedOption === "optionA"
            ? "A " + viewData.optionA
            : "B " + viewData.optionB
        }에 투표했어요!`
      );
      // 임시로 직접 카운트 증가시킴
      if (selectedOption === "optionA") {
        viewData.ACount++;
      } else if (selectedOption === "optionB") {
        viewData.BCount++;
      }
      setVotedOption(selectedOption);
      setIsVoted(true);
      // 실제로는 투표 데이터 post 전송 (`/api/posts/${postId}/`, {"choice": selectedOption})
    } else {
      alert("투표할 항목을 선택해 주세요.");
      return;
    }
  };

  const handleVoteBtnClick = (e: FormEvent) => {
    handleVoteSubmit(e);
  };

  return (
    <>
      <div className="w-full bg-white rounded-xl px-4 sm:px-6 md:px-[70px] py-4">
        <div className="flex justify-end">
          <button className="text-red-dark text-sm" onClick={openModal}>
            신고
          </button>
        </div>
        <div className="flex flex-wrap justify-between items-center pb-2 sm:py-2 px-2 border-b border-blue-200">
          <h2 className="text-lg sm:text-xl mr-2 sm:mr-4">{viewData.title}</h2>
          <div className="text-sm text-gray">
            <span className="mr-4">{viewData.member.nickname}</span>
            <span>{viewData.createdDate}</span>
          </div>
        </div>

        <div className="pt-4">
          <div className="px-2">
            <div className="min-h-[80px]">
              {/* <div className="pb-4">
              <div>사진</div>
            </div> */}
              <div className="pb-6">{viewData.content}</div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2 flex-wrap mr-1">
                {viewData.tag.map((tag: string, index: number) => (
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
                initialLikeCount={viewData.likeCount}
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
                selectedOption === "optionA"
                  ? "text-red-dark bg-blue-100/[0.5]"
                  : ""
              } ${
                votedOption === "optionB"
                  ? "hover:text-black"
                  : "hover:text-red-dark"
              } ${isVoted ? "cursor-auto" : "cursor-pointer"}`}
            >
              <input
                type="radio"
                name="choice"
                value="optionA"
                disabled={isVoted ? true : false}
                checked={selectedOption === "optionA"}
                onChange={() => handleOptionChange("optionA")}
              />
              <span className="font-semibold mx-3">A</span>
              <span>{viewData.optionA}</span>
            </label>
            <label
              className={`flex items-center p-4 mb-1 w-full rounded-xl ${
                selectedOption === "optionB"
                  ? "text-blue-dark bg-blue-100/[0.5]"
                  : ""
              } ${
                votedOption === "optionA"
                  ? "hover:text-black"
                  : "hover:text-blue-dark"
              } ${isVoted ? "cursor-auto" : "cursor-pointer"}`}
            >
              <input
                type="radio"
                name="choice"
                value="optionB"
                disabled={isVoted ? true : false}
                checked={selectedOption === "optionB"}
                onChange={() => handleOptionChange("optionB")}
              />
              <span className="font-semibold mx-3">B</span>
              <span>{viewData.optionB}</span>
            </label>
          </form>

          <div className="w-full bg-color-bg/[0.6] rounded-xl my-4 px-4 pb-3">
            <VoteGraph ACount={viewData.ACount} BCount={viewData.BCount} />
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
      {showModal ? (
        <BasicModal
          message="해당 투표글을 신고 할까요?"
          closeModal={closeModal}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default PostDetail;
