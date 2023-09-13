import { Post } from "../../mocks/mockType";
import { SlArrowDown } from "react-icons/sl";

const InfoBar = ({ roomData }: { roomData: Post }): JSX.Element => {
  return (
    <>
      <div className="absolute w-full p-2 z-20">
        <div tabIndex={0} className="collapse shadow-sm">
          <input type="checkbox" />
          <div className="collapse-title flex items-center justify-between pr-6 bg-white text-base">
            <span>{roomData.title}</span>
            <div>
              <SlArrowDown />
            </div>
          </div>
          <div className="collapse-content bg-white">
            <p className="mb-3">{roomData.title}</p>
            <p>
              <span className="text-red-dark font-bold px-2 py-1 mr-3 rounded-full text-sm md:text-base bg-red-100">
                A
              </span>
              {roomData.optionA}
            </p>
            <p className="mt-3">
              <span className="text-blue-dark font-bold px-2 py-1 mr-3 rounded-full text-sm md:text-base bg-blue-100">
                B
              </span>
              {roomData.optionB}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoBar;
