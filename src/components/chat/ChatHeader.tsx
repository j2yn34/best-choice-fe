import { BiArrowBack } from "react-icons/bi";
import ChatUserBadge from "../common/ChatUserBadge";
import { useNavigate } from "react-router";

const Header = ({
  roomId,
  exit,
}: {
  roomId: string;
  exit: () => void;
}): JSX.Element => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between h-16 px-2 bg-white border-b border-gray/[0.2]">
        <button
          onClick={() => {
            exit();
            navigate(-1);
          }}
          className="text-2xl"
        >
          <BiArrowBack />
        </button>
        <div>{roomId}번 채팅방</div>
        <ChatUserBadge ChatUserCount={1} />
      </div>
    </>
  );
};

export default Header;
