import { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { Post } from "../../mocks/mockType";
import LikeBtn from "../common/LikeBtn";
import VoteGraph from "./VoteGraph";

const PostDetail = ({ postId }: { postId: string }): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | null>(null);

  const {
    isLoading,
    data: postData,
    isError,
  } = useFetchData("/postListData", ["postData"]);

  if (isError) {
    throw new Error("데이터 불러오기 실패");
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const filteredPostData = postData.filter(
    (data: Post) => data.postId === parseInt(postId)
  );
  if (filteredPostData.length === 0) {
    return <p>해당하는 투표글이 없습니다.</p>;
  }
  const viewData = filteredPostData[0];

  const handleOptionChange = (option: "A" | "B") => {
    setSelectedOption(option);
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-8">투표글</h1>
      <div className="w-full bg-white rounded-xl px-4 sm:px-6 md:px-[70px] py-4">
        <div className="flex justify-end">
          <button className="text-red-dark text-sm">신고</button>
        </div>
        <div className="flex flex-wrap justify-between items-center py-3 px-2 border-b border-blue-200">
          <h2 className="text-lg sm:text-xl mr-2 sm:mr-4">{viewData.title}</h2>
          <div className="text-sm text-gray">
            <span className="mr-4">{viewData.member.nickname}</span>
            <span>{viewData.createdDate}</span>
          </div>
        </div>

        <div className="pt-4">
          <div className="min-h-[80px] px-2">
            {/* <div className="pb-4">
              <div>사진</div>
            </div> */}
            <div className="pb-4">{viewData.content}</div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              {viewData.tag.map((tag: string, index: number) => (
                <div
                  key={index}
                  className="badge badge-lg py-3.5 bg-blue-100/[0.2] border-blue-300 text-blue shrink-0"
                >
                  #{tag}
                </div>
              ))}
            </div>
            <LikeBtn initialLikeCount={viewData.likeCount} />
          </div>

          <div className="flex flex-col mb-4 p-2 border border-2 border-blue-200 rounded-xl">
            <label
              className={`flex items-center p-4 mb-1 w-full hover:text-red-dark cursor-pointer rounded-xl ${
                selectedOption === "A" ? "text-red-dark bg-blue-100/[0.5]" : ""
              }`}
            >
              <input
                type="radio"
                name="option"
                value="A"
                checked={selectedOption === "A"}
                onChange={() => handleOptionChange("A")}
              />
              <span className="font-semibold mx-2">A</span>
              <span>{viewData.optionA}</span>
            </label>
            <label
              className={`flex items-center p-4 w-full hover:text-blue-dark cursor-pointer rounded-xl ${
                selectedOption === "B" ? "text-blue-dark bg-blue-100/[0.5]" : ""
              }`}
            >
              <input
                type="radio"
                name="option"
                value="B"
                checked={selectedOption === "B"}
                onChange={() => handleOptionChange("B")}
              />
              <span className="font-semibold mx-2">B</span>
              <span>{viewData.optionB}</span>
            </label>
          </div>

          <div className="w-full bg-color-bg/[0.6] rounded-xl my-4 px-4 pb-3">
            <VoteGraph ACount={viewData.ACount} BCount={viewData.BCount} />
          </div>

          <div className="flex flex-col items-center justify-center pt-4 mb-4">
            <span className="text-sm mb-2.5">지금 채팅 중인 투표글이에요!</span>
            <div className="flex gap-4">
              <button className="btn bg-white text-black-primary hover:bg-color-bg">
                투표하기
              </button>
              <button className="btn bg-black-primary text-white hover:bg-black">
                채팅방 입장하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
