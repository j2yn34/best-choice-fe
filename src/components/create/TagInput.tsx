import { KeyboardEvent, useState, useEffect } from "react";
import { RecoilState, useSetRecoilState } from "recoil";
import { inputValueState } from "../../states/recoil";
import { InputValue } from "../../states/recoilType";
import { TiDelete } from "react-icons/ti";

const maxTagCnt = 5;
const regExp = /[ [\]/?.,;:|)*~`!^\\-_+┼<>@#$%&'"(=]/gi;

const TagInput = () => {
  const [tagItem, setTagItem] = useState<string>("");
  const [tagList, setTagList] = useState<string[]>([]);
  const [maxTag, setMaxTag] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);

  const setInputValue = useSetRecoilState(
    inputValueState as RecoilState<InputValue>
  );

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    setIsValid(true);
    const target = e.target as HTMLInputElement;

    if (regExp.test(tagItem)) {
      setIsValid(false);
      return;
    }

    if (
      target.value.length !== 0 &&
      e.key === "Enter" &&
      e.nativeEvent.isComposing === false &&
      isValid === true
    ) {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    const updatedTagList = [...tagList];
    updatedTagList.push(tagItem);
    setTagList(updatedTagList);

    setInputValue((prevInputValues) => ({
      ...prevInputValues,
      tags: [...updatedTagList],
    }));

    setTagItem("");
  };

  const deleteTagItem = (tagItem: string) => {
    const filteredTagList = tagList.filter((item) => item !== tagItem);
    setTagList(filteredTagList);

    setInputValue((prevInputValues) => ({
      ...prevInputValues,
      tags: [...filteredTagList],
    }));
  };

  useEffect(() => {
    if (tagList.length === maxTagCnt) {
      setMaxTag(true);
    } else {
      setMaxTag(false);
    }
  }, [tagList]);

  return (
    <>
      <div className="flex items-center text-lg mb-4">
        <p>해시태그</p>
        <p className="ml-2 text-xs text-gray">(최대 5개 입력 가능)</p>
      </div>
      <input
        type="text"
        value={tagItem}
        onChange={(e) => setTagItem(e.target.value)}
        placeholder="엔터를 입력하시면 해시태그를 등록할 수 있어요."
        onKeyDown={onKeyDown}
        className={`w-full bg-color-bg focus:outline-none p-3 ${
          maxTag && "opacity-30"
        }`}
        disabled={maxTag}
      ></input>
      {!isValid && (
        <p className="text-sm mt-1 text-red-dark">
          * 띄어쓰기와 특수문자를 포함할 수 없어요.
        </p>
      )}
      <div className="flex md:gap-4 mt-5 gap-2 overflow-x-auto">
        {tagList.map((tagItem, index) => {
          return (
            <div
              key={index}
              className="flex items-center badge badge-lg py-3.5 bg-blue-100/[0.2] border-blue-300 text-blue shrink-0 whitespace-nowrap"
            >
              <p className="h-6">#{tagItem}</p>
              <TiDelete
                className="text-2xl ml-1 cursor-pointer text-gray"
                onClick={() => deleteTagItem(tagItem)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TagInput;
