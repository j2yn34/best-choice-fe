import { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRecoilState, RecoilState } from "recoil";
import { inputValueState } from "../../states/recoil";
import { InputValue } from "../../states/recoilType";
import TagInput from "../common/TagInput";
import FileInput from "../common/FileInput";
import TextEditor from "../common/TextEditor";

const CreatePost = (): JSX.Element => {
  const [inputValue, setInputValue] = useRecoilState(
    inputValueState as RecoilState<InputValue>
  );

  const onchangeInput = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const { value } = e.target;

    setInputValue((prevInputValues) => ({
      ...prevInputValues,
      [key]: value,
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

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
      // window.location.href = "/posts";
    } catch (error) {
      console.error("Error sending data: ", error);
    }
  };

  const onDelete = (e: FormEvent) => {
    e.preventDefault();
    alert("작성 취소");
    window.location.href = "/posts";
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
    </>
  );
};

export default CreatePost;
