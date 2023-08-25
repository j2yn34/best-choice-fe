import { FunctionComponent } from "react";

type FallbackProps = {
  error: Error;
};

const ErrorPage: FunctionComponent<FallbackProps> = ({ error }) => {
  const onReloadClick = () => {
    location.reload();
  };

  console.log(`${error.name} : ${error.message}`);

  return (
    <div className="flex flex-col items-center justify-center pt-8">
      <div className="text-center mb-12">
        <p className="text-6xl font-bold mb-2">404</p>
        <p className="text-xl">앗! 페이지를 로드할 수 없어요.</p>
      </div>
      <button
        onClick={onReloadClick}
        className="btn bg-black-primary text-white hover:bg-black px-6"
      >
        새로고침
      </button>
    </div>
  );
};

export default ErrorPage;
