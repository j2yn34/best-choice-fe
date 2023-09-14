import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import { Link } from "react-router-dom";

const LoginPage = (): JSX.Element => {
  const GOOGLE_AUTH_URI = "http://www.winnow-bestchoice.com:8080/login/google";
  const KAKAO_AUTH_URI = "http://www.winnow-bestchoice.com:8080/login/kakao";
  const NAVER_AUTH_URI = "http://www.winnow-bestchoice.com:8080/login/naver";

  const onSocialLogin = (provider: string) => {
    switch (provider) {
      case "google":
        window.location.href = GOOGLE_AUTH_URI;
        break;
      case "kakao":
        window.location.href = KAKAO_AUTH_URI;
        break;
      default:
        window.location.href = NAVER_AUTH_URI;
        break;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center mb-24">
      <div className="flex flex-col items-center gap-12">
        <Link to="/">
          <img src="/logo.png" className="w-32" alt="로고" />
        </Link>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => onSocialLogin("google")}
            className="btn w-64 h-14 border-0 bg-white hover:bg-blue-100"
          >
            <span className="text-lg">
              <FcGoogle />
            </span>
            <span className="text-base">구글 아이디로 시작</span>
          </button>
          <button
            onClick={() => onSocialLogin("kakao")}
            className="btn w-64 h-14 border-0 bg-[#fee500] hover:bg-[#fada0a]"
          >
            <span className="text-lg">
              <RiKakaoTalkFill />
            </span>
            <span className="text-base">카카오 아이디로 시작</span>
          </button>
          <button
            onClick={() => onSocialLogin("naver")}
            className="btn w-64 h-14 border-0 bg-[#03c75a] hover:bg-[#17b75e]"
          >
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
