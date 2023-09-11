import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import useFetchData from "../../hooks/useFetchData";
import VoteGraph from "./VoteGraph";
import BasicModal from "../modal/BasicModal";
import NoDataMessage from "../common/NoDataMessage";
import { accessTokenState, userInfoState } from "../../states/recoil";
import { UserInfoState } from "../../states/recoilType";
import PostLikeBtn from "../common/button/PostLikeBtn";
import CreateChatRoomBtn from "../common/button/CreateChatRoomBtn";
import EnterChatRoomBtn from "../common/button/EnterChatRoomBtn";

const PostDetail = ({ postId }: { postId: string }): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | null>(null);
  const [votedOption, setVotedOption] = useState<"A" | "B" | null>(null);
  const [isVoted, setIsVoted] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const token = useRecoilValue<string>(accessTokenState);
  const userInfo = useRecoilValue<UserInfoState>(userInfoState);
  const memberId = userInfo.memberId;

  const navigate = useNavigate();

  const { data: postData } = useFetchData(
    `/api/posts/${postId}`,
    [`postData${postId}`],
    token
  );

  useEffect(() => {
    if (postData && postData.myChoice) {
      const myChoice = postData.myChoice;

      if (myChoice === "A" || myChoice === "B") {
        setSelectedOption(myChoice);
        setVotedOption(myChoice);
        setIsVoted(true);
      }
    }
  }, [postData]);

  if (postData <= 0) {
    return <NoDataMessage message="해당하는 투표글이 없어요" />;
  }

  const safeContent = DOMPurify.sanitize(postData.content);

  const handleOptionChange = (option: "A" | "B") => {
    setSelectedOption(option);
  };

  const handleVoteSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) {
      openModal(setShowAlertModal);
      setSelectedOption(null);
      return;
    }
    if (!selectedOption) {
      alert("투표할 항목을 선택해 주세요.");
      return;
    }

    if (selectedOption === "A") {
      postData.acount++;
    } else if (selectedOption === "B") {
      postData.bcount++;
    }
    setVotedOption(selectedOption);
    setIsVoted(true);

    try {
      await axios({
        method: "post",
        url: `/api/api/posts/${postId}/choice?option=${selectedOption}`,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("투표 데이터 전송 실패: ", error);
      if (selectedOption === "A") {
        postData.acount--;
      } else if (selectedOption === "B") {
        postData.bcount--;
      }
      setSelectedOption(null);
      setVotedOption(null);
      setIsVoted(false);
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

  const onReportClick = () => {
    token ? openModal(setShowReportModal) : setShowAlertModal(true);
  };
  const onDeleteClick = () => {
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

  const reportPost = async () => {
    if (!token) {
      openModal(setShowAlertModal);
      setShowReportModal(false);
      return;
    }
    try {
      await axios({
        method: "post",
        url: `/api/api/posts/${postId}/report`,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("게시글 신고 실패: ", error);
    }
    setShowReportModal(false);
    document.body.style.overflow = "auto";
  };

  const isChatActive = postData.liveChatUrl;
  const isMyPost = memberId === postData.member.memberId;
  const srcUrl = "https://winnow-bestchoice.s3.ap-northeast-2.amazonaws.com/";
  const images = postData.resources.filter((resource: string | string[]) =>
    resource.includes("image")
  );
  const videos = postData.resources.filter((resource: string | string[]) =>
    resource.includes("video")
  );

  return (
    <>
      <div className="w-full bg-white rounded-xl px-4 sm:px-6 lg:px-[70px] py-4">
        <div className="flex justify-end">
          {isMyPost ? (
            <button className="text-red-dark text-sm" onClick={onDeleteClick}>
              삭제
            </button>
          ) : (
            <button className="text-red-dark text-sm" onClick={onReportClick}>
              신고
            </button>
          )}
        </div>
        <div className="flex flex-wrap justify-between items-center pb-2 sm:py-2 px-2 border-b border-blue-200">
          <h2 className="text-lg sm:text-xl mr-2 sm:mr-4">{postData.title}</h2>
          <div className="text-sm text-gray">
            <span className="mr-4">{postData.member.nickname}</span>
            <span>
              {moment(postData.createdDate).format("YYYY.MM.DD HH:mm")}
            </span>
          </div>
        </div>

        <div className="pt-4">
          <div className="px-2">
            {images.length > 0 || videos.length > 0 ? (
              <div className="flex items-center gap-2 overflow-x-scroll lg:overflow-auto mb-6">
                {images.map((resource: string, index: number) => (
                  <div key={index} className="shrink-0 w-56 md:shrink md:w-72">
                    <img
                      src={`${srcUrl}${resource}`}
                      alt={`이미지${index + 1}`}
                    />
                  </div>
                ))}
                {videos.map((resource: string, index: number) => (
                  <div key={index} className="shrink-0 w-56 md:shrink md:w-72">
                    <video controls width={300}>
                      <source src={`${srcUrl}${resource}`} />
                      {`동영상${index + 1}`}
                    </video>
                  </div>
                ))}
              </div>
            ) : null}
            <div className="min-h-[80px] pb-10">{parse(safeContent)}</div>

            <div className="flex items-end justify-between mb-4">
              <div className="flex gap-2 flex-wrap mr-1.5">
                {postData.tags.map((tag: string, index: number) => (
                  <div
                    key={index}
                    className="badge badge-lg md:py-3.5 md:text-base text-sm py-3 px-2.5 bg-blue-100/[0.2] border-blue-300 text-blue"
                  >
                    #{tag}
                  </div>
                ))}
              </div>
              <PostLikeBtn
                postId={postData.postId}
                likeCount={postData.likeCount}
                liked={postData.liked ? true : false}
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
            {isChatActive && (
              <span className="text-sm mb-2.5">
                지금 채팅 중인 투표글이에요!
              </span>
            )}
            <div className="flex gap-4">
              <button
                id="vote"
                type="button"
                disabled={isVoted ? true : false}
                onClick={handleVoteBtnClick}
                className={`btn bg-black-primary text-white hover:bg-black ${
                  isVoted ? "disabled-btn" : ""
                }`}
              >
                투표하기
              </button>
              {isMyPost && !isChatActive && (
                <CreateChatRoomBtn postId={postData.postId} token={token} />
              )}
              {isChatActive && (
                <EnterChatRoomBtn postId={postData.postId} token={token} />
              )}
            </div>
          </div>
        </div>
      </div>
      {showReportModal &&
        (postData.reported ? (
          <BasicModal
            message="이미 신고한 투표글이에요"
            closeModal={() => closeModal(setShowReportModal)}
            confirm={() => closeModal(setShowReportModal)}
          />
        ) : (
          <BasicModal
            message="해당 투표글을 신고 할까요?"
            closeModal={() => closeModal(setShowReportModal)}
            confirm={reportPost}
          />
        ))}
      {showDeleteModal && (
        <BasicModal
          message="해당 투표글을 삭제 할까요?"
          closeModal={() => closeModal(setShowDeleteModal)}
          confirm={deletePost}
        />
      )}
      {showAlertModal && (
        <BasicModal
          message="로그인 후 이용해 주세요"
          closeModal={() => closeModal(setShowAlertModal)}
          confirm={() => closeModal(setShowAlertModal)}
        />
      )}
    </>
  );
};

export default PostDetail;
