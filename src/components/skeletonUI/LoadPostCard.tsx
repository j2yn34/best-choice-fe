const LoadPostCard = ({ limit }: { limit: number }) => {
  return (
    <>
      <div className="mt-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-x-6 gap-y-8">
          {Array.from(Array(limit)).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="w-full bg-white rounded-xl p-5 shadow-md">
                <div className="flex justify-between items-center">
                  <div className="w-[60%] h-7 bg-gray/[0.2] rounded-md"></div>
                  <div className="w-[62px] h-[30px] bg-gray/[0.2] badge border-0"></div>
                </div>
                <div className="mt-5 flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center bg-gray/[0.2] w-full min-h-[76px] rounded-xl"></div>
                  <div className="w-5 md:w-10 h-4 bg-gray/[0.2] mx-4 my-2 rounded-md"></div>
                  <div className="flex items-center bg-gray/[0.2] w-full min-h-[76px] rounded-xl"></div>
                </div>
                <div className="flex justify-between items-baseline mt-5 w-full">
                  <div className="flex items-center w-[20%]">
                    <div className="ml-1 w-full h-5 bg-gray/[0.2] rounded-md"></div>
                  </div>
                  <div className="flex items-center w-[30%]">
                    <div className="ml-1 w-full h-5 bg-gray/[0.2] rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LoadPostCard;
