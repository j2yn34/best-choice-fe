import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import AlertModal from "../../modal/AlertModal";

const maxUserCount = 10;

const EnterChatRoomBtn = ({
  postId,
  token,
  isModal,
  userCount,
}: {
  postId: string;
  token: string;
  isModal: boolean;
  userCount: number;
}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  const handleEnterChatRoom = async () => {
    if (token === "") {
      setModalMessage("로그인 후 이용해 주세요");
      return openModal();
    }

    if (userCount === maxUserCount) {
      setModalMessage("제한 인원 초과로 해당 채팅방에 입장할 수 없어요.");
      return openModal();
    }

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

    document.body.style.overflow = "auto";
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
      {showModal && (
        <AlertModal message={modalMessage} closeModal={closeModal} />
      )}
    </>
  );
};

export default EnterChatRoomBtn;
