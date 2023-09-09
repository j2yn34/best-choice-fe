// 채팅 주제(투표 title), 옵션A, B

const InfoBar = (): JSX.Element => {
  return (
    <>
      <div
        tabIndex={0}
        className="collapse collapse-arrow border border-base-300 bg-base-200"
      >
        <div className="collapse-title bg-white text-base">
          열어서 채팅방 정보 보기
        </div>
        <div className="collapse-content bg-white">
          <p>채팅방 타이틀</p>
          <p>A옵션 vs B옵션</p>
        </div>
      </div>
    </>
  );
};

export default InfoBar;
