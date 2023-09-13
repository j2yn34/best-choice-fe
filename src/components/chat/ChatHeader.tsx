import { BiArrowBack } from "react-icons/bi";
import ChatUserBadge from "../common/ChatUserBadge";
import { useNavigate } from "react-router";

const Header = ({
  // roomId,
  exit,
}: {
  roomId: string;
  exit: () => void;
}): JSX.Element => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between h-16 px-2 bg-blue-200 drop-shadow-sm">
        <div className="flex items-center">
          <button
            onClick={() => {
              exit();
              navigate(-1);
            }}
            className="text-2xl mr-1"
          >
            <BiArrowBack />
          </button>
          <span className="text-sm">나가기</span>
        </div>
        {/* <div>{roomId}번 채팅방</div> */}
        <ChatUserBadge ChatUserCount={1} isChatRoom={true} />
      </div>
    </>
  );
};

export default Header;
