import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState, RecoilState, useRecoilValue } from "recoil";
import { inputValueState, accessTokenState } from "../../states/recoil";
import { InputValue } from "../../states/recoilType";
import { MdOutlineClose } from "react-icons/md";
import { AiFillNotification } from "react-icons/ai";

const UploadPost = ({ closeModal }: { closeModal: () => void }) => {
  const token = useRecoilValue<string>(accessTokenState);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useRecoilState(
    inputValueState as RecoilState<InputValue>
  );

  const inputData = {
    title: inputValue.title,
    optionA: inputValue.optionA,
    optionB: inputValue.optionB,
    content: inputValue.content,
    tags: inputValue.tags,
  };

  const inputValueClean = () => {
    setInputValue({
      title: "",
      content: "",
      optionA: "",
      optionB: "",
      tags: [],
      files: null,
    });
  };

  const upload = async () => {
    const formData = new FormData();

    if (inputValue.files) {
      for (let i = 0; i < inputValue.files.length; i++) {
        formData.append("file", inputValue.files[i]);
      }
    }

    formData.append(
      "data",
      new Blob([JSON.stringify(inputData)], { type: "application/json" })
    );

    try {
      await axios({
        method: "post",
        url: "/api/api/posts",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      navigate("/posts");
    } catch (error) {
      console.error("Error sending data: ", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/[0.8] z-50">
      <>
        <div className="flex flex-col max-w-fit md:min-w-[450px] h-fit rounded-xl bg-white z-20 py-4 px-3 mx-2">
          <button className="flex justify-end text-2xl" onClick={closeModal}>
            <MdOutlineClose />
          </button>
          <div className="flex flex-col justify-center items-center py-2 px-4 md:px-8">
            <p className="text-lg font-semibold">투표글을 업로드 할까요?</p>
            <p className="text-xl mt-6 mb-2 text-[#FECB2D]">
              <AiFillNotification />
            </p>
            <p className="text-center">
              투표글을 업로드 한 뒤에는 내용을 수정할 수 없어요.
            </p>
            <button
              className="btn bg-black-primary text-white hover:bg-black mt-10 px-8"
              onClick={() => {
                upload();
                inputValueClean();
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
