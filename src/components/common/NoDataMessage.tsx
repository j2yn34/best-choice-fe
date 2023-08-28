const NoDataMessage = ({ message }: { message: string }): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-44 bg-white border-2 border-color-bg text-center rounded-xl">
      <p>{message}</p>
    </div>
  );
};

export default NoDataMessage;
