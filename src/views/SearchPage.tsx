import ScrollTopBtn from "../components/common/ScrollTopBtn";
import Search from "../components/contents/Search";

const SearchPage = (): JSX.Element => {
  return (
    <>
      <h1 className="text-2xl mb-8 font-semibold">투표글 태그 검색</h1>
      <Search />
      <ScrollTopBtn />
    </>
  );
};

export default SearchPage;
