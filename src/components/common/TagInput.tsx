import { KeyboardEvent, useState } from "react";
import { useRecoilState, RecoilState } from "recoil";
import { inputValueState } from "../../states/recoil";
import { InputValue } from "../../states/recoilType";
import { TiDelete } from "react-icons/ti";

const TagInput = () => {
  const [tagItem, setTagItem] = useState<string>("");
  const [tagList, setTagList] = useState<string[]>([]);
  const [check, setCheck] = useState<boolean>(false);

  const [inputValue, setInputValue] = useRecoilState(
    inputValueState as RecoilState<InputValue>
  );

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.value.length !== 0 && e.key === "Enter") {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    setCheck(false);

    if (tagItem.includes(" ")) {
      setCheck(true);
      setTagItem("");
      return;
    }

    const updatedTagList = [...tagList];
    updatedTagList.unshift(tagItem);
    setTagList(updatedTagList);

    setTagItem("");

    setInputValue((prevInputValues) => ({
      ...prevInputValues,
      tags: [...updatedTagList],
    }));
  };

  const deleteTagItem = (tagItem: string) => {
    const filteredTagList = tagList.filter((item) => item !== tagItem);
    setTagList(filteredTagList);

    setInputValue((prevInputValues) => ({
      ...prevInputValues,
      tags: [...filteredTagList],
    }));
  };

  return (
    <>
      <p className="text-lg mb-4">해시태그</p>
      <input
        type="text"
        value={tagItem}
        onChange={(e) => setTagItem(e.target.value)}
        placeholder="엔터를 입력하시면 해시태그를 등록할 수 있어요."
        onKeyDown={onKeyDown}
        className="w-full bg-color-bg focus:outline-none p-3"
      ></input>
      {check ? (
        <p className="text-sm mt-1 text-red-dark">
          * 공백 문자를 포함할 수 없습니다.
        </p>
      ) : (
        ""
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
