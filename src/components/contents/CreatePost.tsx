import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  Dispatch,
  useState,
} from "react";
import { useRecoilState, RecoilState } from "recoil";
import { inputValueState } from "../../states/recoil";
import { InputValue } from "../../states/recoilType";
import TagInput from "../common/TagInput";
import FileInput from "../common/FileInput";
import TextEditor from "../common/TextEditor";
import CancelCreate from "../modal/CancelCreate";
import UploadPost from "../modal/UploadPost";

const CreatePost = (): JSX.Element => {
  const [inputValue, setInputValue] = useRecoilState(
    inputValueState as RecoilState<InputValue>
  );

  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

  const openModal = (setFun: Dispatch<SetStateAction<boolean>>) => {
    setFun(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = (setFun: Dispatch<SetStateAction<boolean>>) => {
    setFun(false);
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

  const onDelete = (e: FormEvent) => {
    e.preventDefault();
    openModal(setShowCancelModal);
  };

  return (
    <>
      <h1 className="text-2xl mb-8 font-semibold">투표글 작성하기</h1>
      <div className="w-full bg-white rounded-lg md:px-24 py-8 px-5">
        <p className="text-lg mb-4">제목</p>
        <input
          className="w-full bg-color-bg px-4 py-3 mb-7 focus:outline-none"
          placeholder="투표글 제목을 입력해 주세요."
          value={inputValue.title}
          onChange={(e) => onchangeInput(e, "title")}
        />
        <TextEditor />
        <p className="text-lg mb-4">투표 항목</p>
        <div className="flex flex-col md:flex-row justify-between items-center mb-7 gap-3">
          <div className="flex items-center gap-4 w-full">
            <p className="text-lg font-semibold text-red-dark">A</p>
            <input
              className="bg-color-bg w-full p-3 focus:outline-none"
              placeholder="A 항목을 입력해 주세요."
              value={inputValue.optionA}
              onChange={(e) => onchangeInput(e, "optionA")}
            />
          </div>
          <p className="text-lg">vs</p>
          <div className="flex items-center gap-4 w-full">
            <p className="text-lg font-semibold text-blue-dark">B</p>
            <input
              className="bg-color-bg w-full p-3 focus:outline-none"
              placeholder="B 항목을 입력해 주세요."
              value={inputValue.optionB}
              onChange={(e) => onchangeInput(e, "optionB")}
            />
          </div>
        </div>
        <TagInput />
        <FileInput />
      </div>
      <div className="flex justify-center items-center mt-8 gap-6">
        <button className="btn btn-outline" onClick={onDelete}>
          취소
        </button>
        <button
          className="btn bg-black-primary hover:bg-black text-white"
          onClick={onSubmit}
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
