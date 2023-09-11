import axios from "axios";
import { useNavigate } from "react-router";

const CreateChatRoomBtn = ({
  postId,
  token,
}: {
  postId: string;
  token: string;
}) => {
  const navigate = useNavigate();

  const handleCreateChatRoom = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `/api/chat/open/${postId}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const responseData = response.data;
      console.log("채팅방 개설 완료:", responseData);
      enterChatRoom();
    } catch (error) {
      console.error("채팅방 개설 오류:", error);
    }
  };

  const enterChatRoom = async () => {
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
        onClick={handleCreateChatRoom}
        className="btn border-blue-300 bg-blue-200 text-black hover:bg-blue-300 hover:border-blue-300"
      >
        채팅방 개설하기
      </button>
    </>
  );
};

export default CreateChatRoomBtn;
