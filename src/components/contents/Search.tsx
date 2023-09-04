import {
  FormEvent,
  ChangeEvent,
  useState,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import { Post } from "../../mocks/mockType";
import PostCard from "../contents/PostCard";

const Search = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const [submitValue, setSubmitValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tagPostData, setTagPostData] = useState<Post[] | null>(null);

  const searchClick = (e: FormEvent) => {
    e.preventDefault();
    setSubmitValue(inputValue);
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (submitValue !== null) {
      setIsLoading(true);

      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/posts/tag?tag=${submitValue}`);
          const data = response.data["content"];
          setTagPostData(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [submitValue]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  }, []);

  return (
    <>
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
        검색 결과 ({tagPostData === null ? 0 : tagPostData?.length})
      </p>
      <div className="grid grid-cols-1 mt-7 xl:grid-cols-2 xl:gap-x-6 gap-y-8">
        {tagPostData?.map((post: Post) => (
          <PostCard Data={post} key={post.postId} />
        ))}
      </div>
    </>
  );
};

export default Search;
