import { useRecoilState, RecoilState } from "recoil";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { inputValueState } from "../../states/recoil";
import { InputValue } from "../../states/recoilType";

const TextEditor = () => {
  const [inputValue, setInputValue] = useRecoilState(
    inputValueState as RecoilState<InputValue>
  );

  const onChangeContentInput = (content: string) => {
    setInputValue((prevInputValues) => ({
      ...prevInputValues,
      content: content,
    }));
  };

  return (
    <>
      <p className="text-lg mb-4">내용</p>
      <div className="mb-20">
        <ReactQuill
          theme="snow"
          value={inputValue.content}
          onChange={onChangeContentInput}
          className="h-[250px]"
        />
      </div>
    </>
  );
};

export default TextEditor;
