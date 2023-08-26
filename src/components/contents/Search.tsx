import { FormEvent, ChangeEvent, useState, useCallback } from "react";
import axios from "axios";

const Search = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const [submitValue, setSubmitValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setTagPostData] = useState(null);

  const searchClick = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitValue(inputValue);
    setIsLoading(true);

    if (isLoading) {
      return;
    }

    try {
      // 아래 url 주소는 없는 주소(임시 주소) => 요청하면 지금은 무조건 에러 발생
      const response = await axios.get(`/postData/tag=${submitValue}`);
      const data = response.data["content"];
      setTagPostData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  }, []);

  return (
    <>
      <h1 className="text-2xl mb-8 font-semibold">투표글 태그 검색</h1>
      <form onSubmit={searchClick} className="flex justify-center items-center">
        <input
          value={inputValue}
          type="text"
          className="rounded-lg h-[50px] w-4/5 md:w-3/5 pl-3 focus:outline-none shadow-sm"
          placeholder="검색할 태그를 입력해 주세요."
          onChange={handleChange}
          onFocus={() => {
            setInputValue("");
          }}
        />
        <button
          className="btn bg-black-primary sm:px-6 text-white text-base md:text-lg ml-3.5 hover:bg-black"
          disabled={isLoading}
        >
          검색
        </button>
      </form>
      <p className="text-xl mt-8">
        <span className="font-semibold">#{submitValue} </span>
        검색 결과 (0)
      </p>
      {/* <div>
        {TagPostData.map...}
      </div> */}
    </>
  );
};

export default Search;
