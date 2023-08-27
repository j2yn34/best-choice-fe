import { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import ChatUserBadge from "../common/ChatUserBadge";
import EnterChatRoom from "../modal/EnterChatRoom";
import { Post } from "../../mocks/mockType";

const MainChattingList = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [clickedChatData, setClickedChatData] = useState<number | null>(null);

  const { data: chatData } = useFetchData("/activeChatListData", ["chatData"]);

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
      <div
        data-scroll={true}
        className="grid sm:grid-cols-4 md:grid-cols-2 xl:grid-cols-4 gap-6 main_chat"
      >
        {chatData.slice(0, 4).map((data: Post) => (
          <div
            key={data.postId}
            onClick={() => openModal(data)}
            className="border-blue border-2 rounded-xl bg-white w-full h-[180px] shrink-0 p-2.5 cursor-pointer"
            tabIndex={0}
          >
            <div className="flex justify-end mb-2">
              <ChatUserBadge ChatUserCount={data.liveChatUserCount} />
            </div>
            <p className="text-lg text-center font-semibold p-4">
              {data.title}
            </p>
          </div>
        ))}
      </div>
      {showModal ? (
        <EnterChatRoom postId={clickedChatData} closeModal={closeModal} />
      ) : null}
    </>
  );
};

export default MainChattingList;
