import React from "react";
import { useState } from "react";

const SearchPage = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const [submitValue, setSubmitValue] = useState<string>("");

  const searchClick = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitValue(inputValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  return (
    <>
      <h1 className="text-2xl mb-8 font-semibold">게시글 태그 검색</h1>
      <form onSubmit={searchClick} className="flex justify-center items-center">
        <input
          value={inputValue}
          type="text"
          className="rounded-lg h-[50px] w-4/5 md:w-3/5 pl-3 focus:outline-none"
          onChange={handleChange}
          onFocus={() => {
            setInputValue("");
          }}
        />
        <button className="px-3 py-3 md:px-5 bg-black-primary text-white text-base md:text-xl rounded-lg ml-[14px]">
          검색
        </button>
      </form>
      <p className="text-xl mt-8">#{submitValue} 검색 결과(0)</p>
    </>
  );
};

export default SearchPage;
