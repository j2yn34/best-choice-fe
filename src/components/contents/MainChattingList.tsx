import { useState } from "react";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../../states/recoil";
import useFetchData from "../../hooks/useFetchData";
import ChatUserBadge from "../common/ChatUserBadge";
import EnterChatRoom from "../modal/EnterChatRoom";
import { Chat } from "../../mocks/mockType";
import NoDataMessage from "../common/NoDataMessage";

const MainChattingList = (): JSX.Element => {
  const token = useRecoilValue<string>(accessTokenState);
  const [showModal, setShowModal] = useState(false);
  const [clickedChatData, setClickedChatData] = useState<number | null>(null);
  const [page] = useState<number>(0);

  const { data: chatData } = useFetchData(
    `/api/chat/rooms?page=${page}&size=10`,
    [`chatData-${page}`],
    token
  );

  if (chatData.length === 0) {
    return <NoDataMessage message="진행 중인 채팅방이 없어요" />;
  }

  const openModal = (data: Chat) => {
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
        {chatData.slice(0, 4).map((data: Chat) => (
          <div
            key={data.postId}
            onClick={() => openModal(data)}
            className="border-blue border-2 rounded-xl bg-white w-full h-[180px] shrink-0 p-2.5 cursor-pointer"
            tabIndex={0}
          >
            <div className="flex justify-end mb-2">
              <ChatUserBadge
                ChatUserCount={data.userCount}
                isChatRoom={false}
              />
            </div>
            <p className="text-lg text-center font-semibold p-4">
              {data.title}
            </p>
          </div>
        ))}
      </div>
      {showModal && (
        <EnterChatRoom
          postId={clickedChatData}
          closeModal={closeModal}
          page={page}
        />
      )}
    </>
  );
};

export default MainChattingList;
