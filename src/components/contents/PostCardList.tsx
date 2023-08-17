import { Link } from "react-router-dom";
import PostCard from "./PostCard";
import { Post } from "../../mocks/mockDatas/postListData";

// 실제 서버와 연결할 때는 message가 아닌 정렬 함수가 들어갈 예정!
const sortNames = [
  { name: "최신순", message: "최신순 클릭" },
  { name: "추천순", message: "추천순 클릭" },
  { name: "참여자순", message: "참여자순 클릭" },
];

const clickSort = (message: string) => {
  console.log("클릭 성공!");
  alert(message);
};

const PostCardList = ({
  postData,
  title,
  sort,
}: {
  postData: Post[];
  title: string;
  sort: boolean;
}): JSX.Element => {
  return (
    <div>
      <p className="text-2xl font-semibold">{title}</p>
      {sort ? (
        <div className="flex justify-between items-center mt-8">
          <ul className="flex items-center gap-5">
            {sortNames.map((sortName) => (
              <li
                key={sortName.name}
                className="cursor-pointer"
                onClick={() => clickSort(sortName.message)}
              >
                {sortName.name}
              </li>
            ))}
          </ul>

          <Link to="/create">글쓰기</Link>
        </div>
      ) : (
        ""
      )}
      <div className="mt-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-x-6 gap-y-8">
          {postData.map((post) => (
            <PostCard Data={post} key={post.postId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCardList;
