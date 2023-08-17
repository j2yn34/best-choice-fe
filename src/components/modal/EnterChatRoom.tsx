import { Link } from "react-router-dom";
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
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black/[0.8]"></div>
        <div className="flex flex-col absolute w-fit md:w-[560px] md:h-[340px] rounded-xl bg-white z-20 p-6 pt-4">
          <button
            className="flex justify-end mb-3 text-2xl"
            onClick={closeModal}
          >
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
            <Link
              to={`/posts/${data ? data.postId : null}`}
              className="btn bg-white mr-4"
            >
              투표글 보러가기
            </Link>
            <button className="btn bg-black-primary text-white hover:bg-black">
              채팅방 입장하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnterChatRoom;
