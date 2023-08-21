import React, { useState } from "react";
import { useRecoilState, RecoilState } from "recoil";
import { inputValueState } from "../../states/recoil";
import { InputValue } from "../../states/recoilType";

const TagInput = () => {
  const [tagItem, setTagItem] = useState<string>("");
  const [tagList, setTagList] = useState<string[]>([]);

  const [inputValue, setInputValue] = useRecoilState(
    inputValueState as RecoilState<InputValue>
  );

  const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.value.length !== 0 && e.key === "Enter") {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    setTagList((prevTagList) => {
      const updatedTagList = [...prevTagList];
      updatedTagList.unshift(tagItem);
      return updatedTagList;
    });
    setTagItem("");

    setInputValue((prevInputValues) => ({
      ...prevInputValues,
      tags: prevInputValues.tags
        ? [...prevInputValues.tags, tagItem]
        : [tagItem],
    }));
  };

  const deleteTagItem = (tagItem: string) => {
    const filteredTagList = tagList.filter((item) => item !== tagItem);
    setTagList(filteredTagList);

    setInputValue((prevInputValues) => ({
      ...prevInputValues,
      tags: tagList.slice(1),
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
      <div className="flex gap-4 mt-5">
        {tagList.map((tagItem, index) => {
          return (
            <div
              key={index}
              className="flex items-center bg-blue-100 p-2 rounded-lg"
            >
              <p>#{tagItem}</p>
              <button
                onClick={() => deleteTagItem(tagItem)}
                className="py-0.5 px-1.5 text-sm ml-1 bg-white rounded-full"
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TagInput;
