import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import ChatUserBadge from "../common/ChatUserBadge";

const Header = ({ roomId }: { roomId: string }): JSX.Element => {
  return (
    <>
      <div className="flex items-center justify-between py-4 px-2 bg-white border-b border-gray/[0.2]">
        <Link to="/posts">
          <div className="text-2xl">
            <BiArrowBack />
          </div>
        </Link>
        <div>{roomId}번 채팅방</div>
        <ChatUserBadge ChatUserCount={1} />
      </div>
    </>
  );
};

export default Header;
