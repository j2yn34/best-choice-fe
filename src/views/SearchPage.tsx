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
      <h1 className="text-2xl mb-8 font-semibold">투표글 태그 검색</h1>
      <form onSubmit={searchClick} className="flex justify-center items-center">
        <input
          value={inputValue}
          type="text"
          className="rounded-lg h-[50px] w-4/5 md:w-3/5 pl-3 focus:outline-none shadow-sm"
          onChange={handleChange}
          onFocus={() => {
            setInputValue("");
          }}
        />
        <button className="btn bg-black-primary px-6 text-white text-base md:text-lg ml-3.5 hover:bg-black">
          검색
        </button>
      </form>
      <p className="text-lg mt-8">#{submitValue} 검색 결과 (0)</p>
    </>
  );
};

export default SearchPage;
