import axios from "axios";
import { useNavigate } from "react-router";

const EnterChatRoomBtn = ({
  postId,
  token,
  isModal,
}: {
  postId: string;
  token: string;
  isModal: boolean;
}) => {
  const navigate = useNavigate();

  const handleEnterChatRoom = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `/api/chat/enter/${postId}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const responseData = response.data;
      console.log("채팅방 입장 완료:", responseData);
      navigate(`/chat/${postId}`);
    } catch (error) {
      console.error("채팅방 입장 오류:", error);
    }
  };

  return (
    <>
      <button
        onClick={handleEnterChatRoom}
        className={`${
          isModal
            ? "btn bg-black-primary text-white hover:bg-black"
            : "btn border-blue-300 bg-blue-200 text-black hover:bg-blue-300 hover:border-blue-300"
        }`}
      >
        채팅방 입장하기
      </button>
    </>
  );
};

export default EnterChatRoomBtn;
