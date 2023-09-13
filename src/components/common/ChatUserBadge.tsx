import { AiOutlineUser } from "react-icons/ai";

const ChatUserBadge = ({
  ChatUserCount,
  isChatRoom,
}: {
  ChatUserCount: number | undefined;
  isChatRoom: boolean;
}) => {
  return (
    <div
      className={`badge border-0 w-[62px] h-[30px] shrink-0 ml-2 ${
        isChatRoom ? "" : "bg-black-primary"
      }`}
    >
      <div className={`text-lg ${isChatRoom ? "text-black" : "text-white"}`}>
        <AiOutlineUser />
      </div>
      <div
        className={`text-base ml-1 ${isChatRoom ? "text-black" : "text-white"}`}
      >
        {ChatUserCount}
      </div>
    </div>
  );
};

export default ChatUserBadge;
