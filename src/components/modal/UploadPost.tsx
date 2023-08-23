import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState, RecoilState } from "recoil";
import { inputValueState } from "../../states/recoil";
import { InputValue } from "../../states/recoilType";
import { MdOutlineClose } from "react-icons/md";

const UploadPost = ({ closeModal }: { closeModal: () => void }) => {
  const navigate = useNavigate();

  const [inputValue] = useRecoilState(
    inputValueState as RecoilState<InputValue>
  );

  const upload = async () => {
    if (
      inputValue.title === "" ||
      inputValue.optionA === "" ||
      inputValue.optionB === ""
    ) {
      alert("제목과 투표 항목은 필수 입력입니다.");
      return;
    }

    const formData = new FormData();

    formData.append("title", inputValue.title);
    formData.append("optionA", inputValue.optionA);
    formData.append("optionB", inputValue.optionB);
    formData.append("content", inputValue.content);

    if (inputValue.tags) {
      for (let i = 0; i < inputValue.tags.length; i++) {
        formData.append(`tags[${i}]`, inputValue.tags[i]);
      }
    }

    if (inputValue.files) {
      for (let i = 0; i < inputValue.files.length; i++) {
        formData.append(`files[${i}]`, inputValue.files[i]);
      }
    }

    // 임시 post
    try {
      await axios.post("/postListData", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("전송 완료");
      navigate("/posts");
    } catch (error) {
      console.error("Error sending data: ", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/[0.8]"></div>
      <>
        <div className="flex flex-col max-w-[360px] md:min-w-[540px] rounded-xl bg-white z-20 py-3 px-8 mx-2">
          <button className="flex justify-end text-2xl" onClick={closeModal}>
            <MdOutlineClose />
          </button>
          <div className="flex flex-col justify-center items-center">
            <p className="text-xl mt-5">투표글을 업로드 할까요?</p>
            <p className="text-lg mt-8">📣</p>
            <p className="text-lg text-center">
              투표글을 업로드 한 뒤에는 내용을 수정할 수 없어요.
            </p>
            <button
              className="btn bg-black-primary text-white hover:bg-black mt-10 mb-4"
              onClick={() => {
                upload();
                closeModal();
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

export default UploadPost;
