import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-8">
      <div className="text-center mb-12">
        <p className="text-6xl font-bold mb-2">404</p>
        <p className="text-xl">앗! 페이지를 찾을 수 없어요.</p>
      </div>
      <Link
        to="/"
        className="btn bg-black-primary text-white hover:bg-black px-6"
      >
        메인으로
      </Link>
    </div>
  );
};

export default NotFoundPage;
