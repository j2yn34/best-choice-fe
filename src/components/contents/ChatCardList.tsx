import { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { Post } from "../../mocks/mockType";
import EnterChatRoom from "../modal/EnterChatRoom";
import ChatUserBadge from "../common/ChatUserBadge";
import { AiOutlineComment } from "react-icons/ai";
import { RiThumbUpLine } from "react-icons/ri";
import NoDataMessage from "../common/NoDataMessage";

const ChatCardList = () => {
  const [showModal, setShowModal] = useState(false);
  const [clickedChatData, setClickedChatData] = useState<number | null>(null);

  const { data: chatData } = useFetchData(
    "/activeChatListData",
    ["chatData"],
    ""
  );

  if (chatData["content"].length === 0) {
    return <NoDataMessage message="채팅방 데이터가 없어요" />;
  }

  const openModal = (data: Post) => {
    setShowModal(true);
    setClickedChatData(data.postId);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    setClickedChatData(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-x-6 gap-y-8">
        {/* card */}
        {chatData["content"].map((chat: Post) => (
          <div
            className="w-full bg-white rounded-xl p-5 shadow-md cursor-pointer"
            onClick={() => openModal(chat)}
            key={chat.postId}
          >
            <div className="flex justify-between items-center">
              <div className="font-semibold text-lg truncate">{chat.title}</div>
              {chat.liveChatUserCount ? (
                <ChatUserBadge ChatUserCount={chat.liveChatUserCount} />
              ) : (
                ""
              )}
            </div>

            <div className="mt-5 flex flex-col md:flex-row items-center justify-between">
              <div className="px-5 py-2 flex items-center bg-red-300 w-full min-h-[76px] rounded-xl">
                <p className="font-bold text-red-dark mr-2.5">A</p>
                <p>{chat.optionA}</p>
              </div>
              <p className="font-bold px-4 py-2">vs</p>
              <div className="px-5 py-2 flex items-center bg-blue-300 w-full min-h-[76px] rounded-xl">
                <p className="font-bold text-blue-dark mr-2.5">B</p>
                <p>{chat.optionB}</p>
              </div>
            </div>
            <div className="flex justify-between items-baseline mt-5">
              <div className="flex items-center">
                <div className="flex items-center">
                  <RiThumbUpLine />
                  <p className="ml-1 text-sm"> {chat.likeCount}</p>
                </div>
                <div className="flex items-center ml-3.5">
                  <AiOutlineComment />
                  <p className="ml-1 text-sm"> {chat.commentCount}</p>
                </div>
              </div>
              <div className="flex text-sm text-gray">
                <p className="mr-3.5">{chat.member.nickname}</p>
                <p>{chat.createdDate}</p>
              </div>
            </div>
          </div>
        ))}
        {/* card */}
      </div>
      {showModal && (
        <EnterChatRoom postId={clickedChatData} closeModal={closeModal} />
      )}
    </>
  );
};

export default ChatCardList;
