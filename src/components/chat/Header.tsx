import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

// 뒤로가기 아이콘, 종료 버튼(주최지만 보이도록)

const Header = ({ roomId }: { roomId: string }): JSX.Element => {
  return (
    <>
      <div className="flex items-center justify-between py-4 px-2 bg-white">
        <Link to="/posts">
          <BiArrowBack />
        </Link>
        <div>{roomId}번 채팅방</div>
        <button
          onClick={() => {
            alert("채팅을 종료합니다.");
          }}
        >
          종료
        </button>
      </div>
    </>
  );
};

export default Header;
