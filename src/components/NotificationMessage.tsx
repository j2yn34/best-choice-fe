const NotificationMessage = () => {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <div>1분 전</div>
        <div>
          <button>삭제</button>
        </div>
      </div>
      <div
        tabIndex={0}
        className="flex flex-col md:flex-row items-center w-full min-h-[96px] p-5 mb-6 bg-white rounded-2xl shadow-md"
      >
        <span className="text-lg font-semibold mr-3">
          깻잎 논쟁에 대해 어떻게 생각하시나요?
        </span>
        <span className="text-sm mt-1.5 md:mt-0">
          투표글의 채팅방이 개설되었어요.
        </span>
      </div>

      <div className="flex justify-between mb-4">
        <div>2023.08.19</div>
        <div>
          <button>삭제</button>
        </div>
      </div>
      <div
        tabIndex={0}
        className="opacity-50 flex flex-col md:flex-row items-center w-full min-h-[96px] p-5 mb-6 bg-white rounded-2xl shadow-md"
      >
        <span className="text-lg font-semibold mr-3">
          깻잎 논쟁에 대해 어떻게 생각하시나요?
        </span>
        <span className="text-sm mt-1.5 md:mt-0">
          투표글의 채팅방이 개설되었어요.
        </span>
      </div>
    </div>
  );
};

export default NotificationMessage;
