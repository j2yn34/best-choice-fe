import { useEffect, useState } from "react";
import axios from "axios";
import ChatUserBadge from "./common/ChatUserBadge";
import { Post } from "../mocks/mockDatas/activeChatListData";

const MainChattingList = (): JSX.Element => {
  const [chatRoomData, setChatRoomData] = useState<Post[]>([]);

  const getData = async () => {
    try {
      const response = await axios.get("/activeChatListData");
      const data = response.data["content"];
      setChatRoomData(data);
    } catch (error) {
      console.error("채팅방 리스트 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex gap-x-6">
        {chatRoomData.slice(0, 4).map((data) => (
          <div
            key={data.postId}
            onClick={() => console.log("모달")}
            className="flex flex-col border border-blue border-2 rounded-xl bg-white w-[258px] h-[180px] shrink-0 p-2.5 cursor-pointer"
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
    </>
  );
};

export default MainChattingList;
