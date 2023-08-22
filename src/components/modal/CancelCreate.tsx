import { useNavigate } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";

const CancelCreate = ({ closeModal }: { closeModal: () => void }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/[0.8]"></div>
      <>
        <div className="flex flex-col max-w-[360px] md:min-w-[540px] rounded-xl bg-white z-20 py-3 px-8 mx-2">
          <button className="flex justify-end text-2xl" onClick={closeModal}>
            <MdOutlineClose />
          </button>
          <div className="flex flex-col justify-center items-center">
            <p className="text-xl mt-5">투표글 작성을 취소 할까요?</p>
            <p className="text-lg mt-8">📣</p>
            <p className="text-lg text-center">
              취소를 하면 작성한 내용이 모두 사라져요.
            </p>
            <button
              className="btn bg-black-primary text-white hover:bg-black mt-10 mb-4"
              onClick={() => {
                closeModal();
                navigate("/posts");
              }}
            >
              확인
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default CancelCreate;
