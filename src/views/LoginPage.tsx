import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";

const LoginPage = (): JSX.Element => {
  return (
    <div className="fixed inset-0 flex items-center justify-center mb-24">
      <div className="flex flex-col items-center gap-12">
        <span>로고</span>
        <div className="flex flex-col gap-4">
          <button className="btn w-64 h-14 border-0 bg-white hover:bg-blue-100">
            <span className="text-lg">
              <FcGoogle />
            </span>
            <span className="text-base">구글 아이디로 시작</span>
          </button>
          <button className="btn w-64 h-14 border-0 bg-[#fee500] hover:bg-[#fada0a]">
            <span className="text-lg">
              <RiKakaoTalkFill />
            </span>
            <span className="text-base">카카오 아이디로 시작</span>
          </button>
          <button className="btn w-64 h-14 border-0 bg-[#03c75a] hover:bg-[#17b75e]">
            <span className="text-white">
              <SiNaver />
            </span>
            <span className="text-base">네이버 아이디로 시작</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
