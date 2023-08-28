const LoadPostDetail = () => {
  return (
    <div className="w-full bg-white rounded-xl px-4 sm:px-6 md:px-[70px] py-4 animate-pulse">
      <div className="flex justify-end">
        <div className="w-8 h-4 bg-gray/[0.2] rounded-md"></div>
      </div>
      <div className="flex flex-wrap justify-between items-center pb-2 sm:py-2 px-2 border-b border-gray/[0.2]">
        <div className="w-[100%] sm:w-[60%] h-7 bg-gray/[0.2] rounded-md mr-8"></div>
        <div className="w-[140px] h-4 mt-1 md:mt-0 bg-gray/[0.2] rounded-md"></div>
      </div>
      <div className="pt-4">
        <div className="px-2">
          <div className="min-h-[80px]">
            <div className="w-[100%] h-5 bg-gray/[0.2] rounded-md mb-6"></div>
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2 flex-wrap mr-1">
              <div className="w-16 h-7 bg-gray/[0.2] badge border-0"></div>
              <div className="w-16 h-7 bg-gray/[0.2] badge border-0"></div>
            </div>
            <div className="w-[80px] h-6 bg-gray/[0.2] rounded-md"></div>
          </div>
        </div>
        <div className="flex flex-col mb-4 p-2 border-2 border-gray/[0.2] rounded-xl">
          <div className="flex items-center p-4 mb-1 w-full rounded-xl">
            <div className="w-40 h-6 bg-gray/[0.2] rounded-md"></div>
          </div>
          <div className="flex items-center p-4 mb-1 w-full rounded-xl">
            <div className="w-40 h-6 bg-gray/[0.2] rounded-md"></div>
          </div>
        </div>
        <div className="w-full min-h-[180px] bg-color-bg/[0.6] rounded-xl my-4 px-4 py-6">
          <div className="w-58 sm:w-80 h-10 bg-gray/[0.2] rounded-md mb-10"></div>
          <div className="w-58 sm:w-80 h-10 bg-gray/[0.2] rounded-md"></div>
        </div>
        <div className="w-full h-[94px]"></div>
      </div>
    </div>
  );
};

export default LoadPostDetail;
