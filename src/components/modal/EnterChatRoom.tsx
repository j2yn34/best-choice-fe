import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../../states/recoil";
import { MdOutlineClose } from "react-icons/md";
import useFetchData from "../../hooks/useFetchData";
import { Post } from "../../mocks/mockType";
import AlertModal from "./AlertModal";
import EnterChatRoomBtn from "../common/button/EnterChatRoomBtn";

const EnterChatRoom = ({
  postId,
  closeModal,
  page,
}: {
  postId: number | null;
  closeModal: () => void;
  page: number;
}) => {
  const token = useRecoilValue<string>(accessTokenState);

  const {
    isLoading,
    data: chatData,
    isError,
  } = useFetchData(
    `/api/chat/rooms?page=${page}&size=10`,
    [`chatData-${page}`],
    token
  );

  if (isError) {
    console.log("데이터 불러오기 실패");
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredPostData = chatData.filter(
    (data: Post) => data.postId === postId
  );

  if (filteredPostData.length === 0) {
    return (
      <AlertModal message="해당하는 채팅방이 없어요" closeModal={closeModal} />
    );
  }

  const viewData = filteredPostData[0];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/[0.8] z-50">
      <div className="flex flex-col max-w-[360px] md:min-w-[540px] rounded-xl bg-white z-20 p-4 mx-2">
        <button className="flex justify-end text-2xl" onClick={closeModal}>
          <MdOutlineClose />
        </button>
        <div className="p-2 md:p-4">
          <div className="text-center">
            <p className="font-semibold text-xl">
              "{viewData ? viewData.title : null}"
            </p>
            <p className="pt-1">투표글의 채팅방이 개설되었어요.</p>
          </div>

          <div className="mt-7 flex flex-col md:flex-row items-center justify-between">
            <div className="px-5 py-2 flex items-center bg-red-300 w-full min-h-[76px] rounded-xl">
              <p className="font-bold text-red-dark mr-2.5">A</p>
              <p>{viewData ? viewData.optionA : null}</p>
            </div>
            <p className="font-bold px-4 py-2">vs</p>
            <div className="px-5 py-2 flex items-center bg-blue-300 w-full min-h-[76px] rounded-xl">
              <p className="font-bold text-blue-dark mr-2.5">B</p>
              <p>{viewData ? viewData.optionB : null}</p>
            </div>
          </div>

          <div className="flex flex-row justify-center mt-8">
            <Link
              to={`/posts/${viewData ? viewData.postId : null}`}
              className="btn bg-white mr-4"
              onClick={closeModal}
            >
              투표글 보러가기
            </Link>
            <EnterChatRoomBtn
              postId={viewData.postId}
              token={token}
              isModal={true}
              userCount={chatData[0].userCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterChatRoom;
