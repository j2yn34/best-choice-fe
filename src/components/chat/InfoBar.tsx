// 채팅 주제(투표 title), 옵션A, B

const InfoBar = (): JSX.Element => {
  return (
    <>
      <div className="absolute w-full p-1 z-20">
        <div tabIndex={0} className="collapse bg-base-200 shadow-sm">
          <input type="checkbox" />
          <div className="collapse-title bg-white text-base">투표글 제목</div>
          <div className="collapse-content bg-white">
            <p className="mb-2">투표글 제목</p>
            <p className="py-1">A옵션</p>
            <p className="py-1">B옵션</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoBar;
