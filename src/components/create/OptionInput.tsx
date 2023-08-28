import { ChangeEvent } from "react";
import { useRecoilState, RecoilState } from "recoil";
import { inputValueState } from "../../states/recoil";
import { InputValue } from "../../states/recoilType";

const OptionInput = ({ option }: { option: string }): JSX.Element => {
  const onchangeInput = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const { value } = e.target;

    setInputValue((prevInputValues) => ({
      ...prevInputValues,
      [key]: value,
    }));
  };

  const [inputValue, setInputValue] = useRecoilState(
    inputValueState as RecoilState<InputValue>
  );

  return (
    <>
      <div className="flex items-center gap-4 w-full">
        <p
          className={`text-lg font-semibold ${
            option === "A" ? "text-red-dark" : "text-blue-dark"
          }`}
        >
          {option}
        </p>
        <input
          className="bg-color-bg w-full p-3 focus:outline-none"
          placeholder={`${option}항목을 입력해 주세요.`}
          value={option === "A" ? inputValue.optionA : inputValue.optionB}
          onChange={(e) => onchangeInput(e, `option${option}`)}
        />
      </div>
    </>
  );
};

export default OptionInput;
