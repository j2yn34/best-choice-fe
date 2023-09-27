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

// 임시 그태 목록
const recommendSearchTags = [
  { name: "balance", tag: "밸런스" },
  { name: "food", tag: "음식" },
  { name: "worry", tag: "고민" },
  { name: "date", tag: "연애" },
];

const Search = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const [submitValue, setSubmitValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tagPostData, setTagPostData] = useState<Post[] | null>(null);

  const searchBtnClick = (e: FormEvent) => {
    e.preventDefault();
    setSubmitValue(inputValue);
  };

  const searchTagClick = useCallback((searchTag: string) => {
    setSubmitValue(searchTag);
  }, []);

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
      <form
        onSubmit={searchBtnClick}
        className="flex justify-center items-center"
      >
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
      <div className="flex items-center justify-center mt-4">
        {recommendSearchTags.map((searchTag) => (
          <button
            key={searchTag.name}
            className="badge badge-lg py-3.5 ml-2 bg-blue-100/[0.2] border-blue-300 text-blue"
            onClick={() => searchTagClick(searchTag.tag)}
          >
            #{searchTag.tag}
          </button>
        ))}
      </div>
      {submitValue && (
        <p className="text-xl mt-8">
          <span className="font-semibold">#{submitValue} </span>
          검색 결과 ({tagPostData === null ? 0 : tagPostData?.length})
        </p>
      )}
      <div className="grid grid-cols-1 mt-7 xl:grid-cols-2 xl:gap-x-6 gap-y-8">
        {tagPostData?.map((post: Post) => (
          <PostCard Data={post} key={post.postId} />
        ))}
      </div>
    </>
  );
};

export default Search;
