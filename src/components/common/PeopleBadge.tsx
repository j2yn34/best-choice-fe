import { AiOutlineUser } from "react-icons/ai";

const PeopleBadge = () => {
  return (
    <div className="badge border-0 bg-black-primary w-[62px] h-[30px]">
      <div className="text-white text-lg">
        <AiOutlineUser />
      </div>
      <div className="text-white text-base ml-1">9</div>
    </div>
  );
};

export default PeopleBadge;
