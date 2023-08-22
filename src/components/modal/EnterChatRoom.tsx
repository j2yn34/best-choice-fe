import { Link } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import useFetchData from "../../hooks/useFetchData";
import { Post } from "../../mocks/mockType";

const EnterChatRoom = ({
  postId,
  closeModal,
}: {
  postId: number | null;
  closeModal: () => void;
}) => {
  const {
    isLoading,
    data: postData,
    isError,
  } = useFetchData("/postListData", ["postData"]);

  if (isError) {
    console.log("데이터 불러오기 실패");
  }

  const filteredPostData = postData.filter(
    (data: Post) => data.postId === postId
  );

  if (filteredPostData.length === 0) {
    alert("해당하는 투표글이 없습니다.");
    return;
  }

  const viewData = filteredPostData[0];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/[0.8]"></div>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <div className="flex flex-col max-w-[360px] md:min-w-[540px] rounded-xl bg-white z-20 p-4 mx-2">
            <button className="flex justify-end text-2xl" onClick={closeModal}>
              <MdOutlineClose />
            </button>
            <div className="p-2 md:p-4">
              <div className="text-center">
                <p className="font-bold text-xl">
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
                <button
                  className="btn bg-black-primary text-white hover:bg-black"
                  onClick={closeModal}
                >
                  채팅방 입장하기
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EnterChatRoom;
