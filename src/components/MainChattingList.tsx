import { useEffect, useState } from "react";
import axios from "axios";
import ChatUserBadge from "./common/ChatUserBadge";
import { Post } from "../mocks/mockDatas/activeChatListData";
import EnterChatRoom from "./modal/EnterChatRoom";

const MainChattingList = (): JSX.Element => {
  const [chatRoomData, setChatRoomData] = useState<Post[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChatData, setSelectedChatData] = useState<Post | null>(null);

  const getData = async () => {
    try {
      const response = await axios.get("/activeChatListData");
      const data = response.data["content"];
      setChatRoomData(data);
    } catch (error) {
      console.error("채팅방 리스트 가져오는 중 오류 발생:", error);
    }
  };

  const openModal = (data: Post) => {
    setModalOpen(true);
    setSelectedChatData(data);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedChatData(null);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div
        data-scroll={true}
        className="grid sm:grid-cols-4 md:grid-cols-2 xl:grid-cols-4 gap-6 main_chat"
      >
        {chatRoomData.slice(0, 4).map((data) => (
          <div
            key={data.postId}
            onClick={() => openModal(data)}
            className="flex flex-col border border-blue border-2 rounded-xl bg-white w-full h-[180px] shrink-0 p-2.5 cursor-pointer"
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
      {modalOpen ? (
        <EnterChatRoom data={selectedChatData} closeModal={closeModal} />
      ) : null}
    </>
  );
};

export default MainChattingList;
