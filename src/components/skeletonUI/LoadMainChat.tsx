const LoadMainChat = (): JSX.Element => {
  return (
    <>
      <div
        data-scroll={true}
        className="grid sm:grid-cols-4 md:grid-cols-2 xl:grid-cols-4 gap-6 main_chat"
      >
        {Array.from(Array(4)).map((_, index) => (
          <div
            key={index}
            className="animate-pulse border-gray/[0.2] border-2 rounded-xl bg-white w-full h-[180px] shrink-0 p-2.5"
          >
            <div className="flex justify-end mb-2">
              <div className="w-[62px] h-7 bg-gray/[0.2] badge border-0"></div>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <p className="w-[70%] h-6 bg-gray/[0.2] rounded-md mb-2"></p>
              <p className="w-[30%] h-6 bg-gray/[0.2] rounded-md md:hidden xl:block"></p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LoadMainChat;
