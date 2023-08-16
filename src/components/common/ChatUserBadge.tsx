import { AiOutlineUser } from "react-icons/ai";

const ChatUserBadge = ({
  ChatUserCount,
}: {
  ChatUserCount: number | undefined;
}) => {
  return (
    <div className="badge border-0 bg-black-primary w-[62px] h-[30px]">
      <div className="text-white text-lg">
        <AiOutlineUser />
      </div>
      <div className="text-white text-base ml-1">{ChatUserCount}</div>
    </div>
  );
};

export default ChatUserBadge;
