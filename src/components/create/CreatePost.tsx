import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  Dispatch,
  useState,
  useEffect,
} from "react";
import { useRecoilState, RecoilState } from "recoil";
import { inputValueState } from "../../states/recoil";
import { InputValue } from "../../states/recoilType";
import OptionInput from "../create/OptionInput";
import TagInput from "./TagInput";
import FileInput from "./FileInput";
import TextEditor from "./TextEditor";
import CancelCreate from "../modal/CancelCreate";
import UploadPost from "../modal/UploadPost";

const CreatePost = (): JSX.Element => {
  const [inputValue, setInputValue] = useRecoilState(
    inputValueState as RecoilState<InputValue>
  );

  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);

  const openModal = (setFunc: Dispatch<SetStateAction<boolean>>) => {
    setFunc(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = (setFunc: Dispatch<SetStateAction<boolean>>) => {
    setFunc(false);
    document.body.style.overflow = "auto";
  };

  const onchangeInput = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const { value } = e.target;

    setInputValue((prevInputValues) => ({
      ...prevInputValues,
      [key]: value,
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    openModal(setShowUploadModal);
  };

  const onCancel = (e: FormEvent) => {
    e.preventDefault();
    openModal(setShowCancelModal);
  };

  useEffect(() => {
    if (
      inputValue.title !== "" &&
      inputValue.optionA !== "" &&
      inputValue.optionB !== ""
    ) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [inputValue]);

  return (
    <>
      <div className="w-full bg-white rounded-lg md:px-24 py-8 px-5">
        <div className="text-lg mb-4 flex items-center">
          <p>제목</p>
          <p className="ml-2 text-xs text-red-dark">* 필수 입력</p>
        </div>
        <input
          className="w-full bg-color-bg px-4 py-3 mb-7 focus:outline-none"
          placeholder="투표글 제목을 입력해 주세요."
          value={inputValue.title}
          onChange={(e) => onchangeInput(e, "title")}
          required
        />
        <TextEditor />
        <div className="text-lg mb-4 flex items-center">
          <p>투표 항목</p>
          <p className="ml-2 text-xs text-red-dark">* 필수 입력</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-7 gap-3">
          <OptionInput option="A" />
          <p className="text-lg">vs</p>
          <OptionInput option="B" />
        </div>
        <TagInput />
        <FileInput />
      </div>
      <div className="flex justify-center items-center mt-8 gap-6">
        <button className="btn btn-outline" onClick={onCancel}>
          취소
        </button>
        <button
          className={`btn bg-black-primary hover:bg-black text-white ${
            disabledBtn ? "opacity-30" : null
          }`}
          onClick={onSubmit}
          disabled={disabledBtn}
        >
          작성 완료
        </button>
      </div>
      {showCancelModal ? (
        <CancelCreate closeModal={() => closeModal(setShowCancelModal)} />
      ) : null}
      {showUploadModal ? (
        <UploadPost closeModal={() => closeModal(setShowUploadModal)} />
      ) : null}
    </>
  );
};

export default CreatePost;
