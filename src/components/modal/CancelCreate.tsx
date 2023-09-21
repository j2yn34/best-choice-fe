import { useRecoilState, RecoilState } from "recoil";
import { inputValueState } from "../../states/recoil";
import { InputValue } from "../../states/recoilType";
import { useNavigate } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import { AiFillNotification } from "react-icons/ai";

const CancelCreate = ({ closeModal }: { closeModal: () => void }) => {
  const [, setInputValue] = useRecoilState(
    inputValueState as RecoilState<InputValue>
  );

  const inputValueClean = () => {
    setInputValue({
      title: "",
      content: "",
      optionA: "",
      optionB: "",
      tags: [],
      imageFile: null,
      videoFile: null,
    });
  };

  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/[0.8] z-50">
      <>
        <div className="flex flex-col max-w-fit md:min-w-[450px] h-fit rounded-xl bg-white z-20 py-4 px-3 mx-2">
          <button className="flex justify-end text-2xl" onClick={closeModal}>
            <MdOutlineClose />
          </button>
          <div className="flex flex-col justify-center items-center py-2 px-4 md:px-8">
            <p className="text-lg font-semibold">투표글 작성을 취소할까요?</p>
            <p className="text-xl mt-6 mb-2 text-[#FECB2D]">
              <AiFillNotification />
            </p>
            <p className="text-center">
              취소를 하면 작성한 내용이 모두 사라져요.
            </p>
            <button
              className="btn bg-black-primary text-white hover:bg-black mt-10 px-8"
              onClick={() => {
                closeModal();
                inputValueClean();
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
