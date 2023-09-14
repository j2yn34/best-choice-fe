import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import useFetchData from "../../hooks/useFetchData";
import NotificationEnterChatRoom from "../modal/NotificationEnterChatRoom";
import { Notification } from "../../mocks/mockType";
import NoDataMessage from "../common/NoDataMessage";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../../states/recoil";
import BasicModal from "../modal/BasicModal";

const NotificationCard = (): JSX.Element => {
  const [showChatEnterModal, setShowChatEnterModal] = useState<boolean>(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState<boolean>(false);
  const [clickedData, setClickedData] = useState<number | null>(null);
  const token = useRecoilValue<string>(accessTokenState);

  const { data: notificationData } = useFetchData(
    "/api/api/notifications/all?page=0",
    ["notificationData"],
    token
  );

  if (notificationData["content"].length <= 0) {
    return <NoDataMessage message="새로운 알림이 없어요" />;
  }

  const openChatEnterModal = (data: Notification) => {
    setShowChatEnterModal(true);
    setClickedData(data.notificationId);
    document.body.style.overflow = "hidden";
  };

  const openDeleteAllModal = () => {
    setShowDeleteAllModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = (setFunc: Dispatch<SetStateAction<boolean>>) => {
    setFunc(false);
    document.body.style.overflow = "auto";
  };

  const onDeleteAllNoticeClick = async () => {
    try {
      await axios({
        method: "delete",
        url: `/api/api/notifications`,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      location.reload();
      closeModal(setShowDeleteAllModal);
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteNoticeClick = async (data: Notification) => {
    try {
      await axios({
        method: "delete",
        url: `/api/api/notifications/${data.notificationId}`,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <>
        <div className="flex w-full justify-end mb-3">
          <button onClick={openDeleteAllModal} className="text-red-dark">
            전체 삭제
          </button>
        </div>

        {notificationData["content"].map((data: Notification) => (
          <div key={data.notificationId}>
            <div className="flex justify-between mb-3">
              <div>{data.createdDate}</div>
              <div>
                <button onClick={() => onDeleteNoticeClick(data)}>삭제</button>
              </div>
            </div>

            <div
              tabIndex={0}
              onClick={() => openChatEnterModal(data)}
              className={`flex flex-col md:flex-row items-center w-full min-h-[96px] p-5 mb-8 bg-white rounded-2xl shadow-md cursor-pointer text-center ${
                data.checked ? "opacity-50" : ""
              }`}
            >
              <span className="text-lg font-semibold mr-3">
                "{data.postTitle}"
              </span>
              <span className="text-sm mt-1.5 md:mt-0">
                투표글의 채팅방이 개설되었어요.
              </span>
            </div>
          </div>
        ))}
      </>
      {showChatEnterModal && (
        <NotificationEnterChatRoom
          notificationId={clickedData}
          closeModal={() => closeModal(setShowChatEnterModal)}
        />
      )}
      {showDeleteAllModal && (
        <BasicModal
          message={"전체 알림을 삭제할까요?"}
          closeModal={() => closeModal(setShowDeleteAllModal)}
          confirm={onDeleteAllNoticeClick}
        />
      )}
    </>
  );
};

export default NotificationCard;
