import { FunctionComponent } from "react";
import { Link, useLocation } from "react-router-dom";

const ErrorPage = () => {
  const { pathname } = useLocation();
  const isNotFound = pathname === "*";
  
  const onReloadClick = () => {
    location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center pt-8">
      <div className="text-center mb-12">
        <p className="text-6xl font-bold mb-2">404</p>
        {isNotFound ? (
          <p className="text-xl">앗! 페이지를 로드할 수 없어요.</p>
        ) : (
          <p className="text-xl">앗! 페이지를 찾을 수 없어요.</p>
        )}
      </div>
      {isNotFound ? (
        <button
          onClick={onReloadClick}
          className="btn bg-black-primary text-white hover:bg-black px-6"
        >
          새로고침
        </button>
      ) : (
        <Link
          to="/"
          className="btn bg-black-primary text-white hover:bg-black px-6"
        >
          메인으로
        </Link>
      )}
    </div>
  );
};

export default ErrorPage;
