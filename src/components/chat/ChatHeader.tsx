import axios from "axios";
import { useRecoilValue } from "recoil";
import { userInfoState, accessTokenState } from "../../states/recoil";
import { Post } from "../../mocks/mockType";
import { BiArrowBack } from "react-icons/bi";
import ChatUserBadge from "../common/ChatUserBadge";
import { useNavigate } from "react-router";

const Header = ({
  roomId,
  exit,
  chatList,
  roomData,
}: {
  roomId: string;
  exit: () => void;
  chatList: {
    sender: string | null;
    chat: string | null;
    type: string | null;
    sendTime: string | null;
    userCount: number;
  }[];
  roomData: Post;
}): JSX.Element => {
  const token = useRecoilValue<string>(accessTokenState);
  const userData = useRecoilValue(userInfoState);
  const roomUserNickname = roomData.member.memberId;
  const isHost = userData.memberId === roomUserNickname;

  const navigate = useNavigate();

  const exitHost = async () => {
    try {
      await axios({
        method: "delete",
        url: `/api/chat/rooms/${roomId}`,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      exit();
      navigate(-1);
    } catch (error) {
      console.error("채팅방 종료 실패: ", error);
    }
  };

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
        <div className="flex items-center">
          {/* <p>{roomId}</p> */}
          {isHost && (
            <button onClick={exitHost} className="font-semibold">
              종료
            </button>
          )}
          <ChatUserBadge
            ChatUserCount={chatList[chatList.length - 1].userCount}
            isChatRoom={true}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
