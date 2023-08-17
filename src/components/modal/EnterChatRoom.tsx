import { Post } from "../../mocks/mockDatas/activeChatListData";
import { MdOutlineClose } from "react-icons/md";

const EnterChatRoom = ({
  data,
  closeModal,
}: {
  data: Post | null;
  closeModal: () => void;
}) => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
      <div className="flex flex-col absolute top-[20%] left-[10%] w-fit md:w-[560px] md:h-[340px] rounded-xl bg-white z-20 p-6 pt-4">
        <button className="flex justify-end mb-2 text-2xl" onClick={closeModal}>
          <MdOutlineClose />
        </button>
        <div className="text-center">
          <p className="font-bold text-xl">"{data ? data.title : null}"</p>
          <p className="pt-1">투표글의 채팅방이 개설되었어요.</p>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="px-5 py-2 flex items-center bg-red-300 w-full min-h-[76px] rounded-xl">
            <p className="font-bold text-red-dark mr-2.5">A</p>
            <p>{data ? data.optionA : null}</p>
          </div>
          <p className="font-bold px-4 py-2">vs</p>
          <div className="px-5 py-2 flex items-center bg-blue-300 w-full min-h-[76px] rounded-xl">
            <p className="font-bold text-blue-dark mr-2.5">B</p>
            <p>{data ? data.optionB : null}</p>
          </div>
        </div>

        <div className="flex flex-row justify-center mt-10">
          <button className="btn bg-white mr-3">투표글 보러가기</button>
          <button className="btn bg-black-primary text-white hover:bg-black">
            채팅방 입장하기
          </button>
        </div>
      </div>
    </>
  );
};

export default EnterChatRoom;
