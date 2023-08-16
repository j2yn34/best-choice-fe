import MainChattingList from "../components/MainChattingList";

const MainPage = (): JSX.Element => {
  return (
    <>
      <div className="text-2xl font-semibold mb-8">진행 중인 채팅방</div>
      <MainChattingList />
    </>
  );
};

export default MainPage;
