const ErrorMessage = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-44 bg-white border-2 border-color-bg text-center rounded-xl">
      <p>🥹</p>
      <p>데이터를 불러올 수 없어요</p>
      <p>새로고침 후 이용해 주세요</p>
    </div>
  );
};

export default ErrorMessage;
