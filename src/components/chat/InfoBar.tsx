import { SlArrowDown } from "react-icons/sl";

const InfoBar = (): JSX.Element => {
  return (
    <>
      <div className="absolute w-full p-2 z-20">
        <div tabIndex={0} className="collapse shadow-sm">
          <input type="checkbox" />
          <div className="collapse-title flex items-center justify-between pr-6 bg-white text-base">
            <span>투표글 제목</span>
            <div>
              <SlArrowDown />
            </div>
          </div>
          <div className="collapse-content bg-white">
            <p className="mb-2">투표글 제목</p>
            <p className="py-1">A옵션</p>
            <p className="py-1">B옵션</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoBar;
