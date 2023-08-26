const LoadNotification = () => {
  return (
    <>
      {Array.from(Array(2)).map((_, index) => (
        <div key={index}>
          <div className="flex justify-between pt-8 mb-4 animate-pulse">
            <div className="w-[80px] h-6 bg-gray/[0.2] rounded-md"></div>
            <div className="w-[30px] h-6 bg-gray/[0.2] rounded-md"></div>
          </div>
          <div className="flex flex-col md:flex-row items-center w-full min-h-[96px] p-5 mb-8 bg-white rounded-2xl shadow-md">
            <div className="w-[50%] md:w-[30%] h-7 bg-gray/[0.2] rounded-md mr-3"></div>
            <div className="w-[30%] md:w-[20%] h-5 bg-gray/[0.2] rounded-md mt-1.5 md:mt-0"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default LoadNotification;
