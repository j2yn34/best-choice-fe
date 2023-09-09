const ChatList = ({ chatList }: { chatList: string[] }): JSX.Element => {
  return (
    <>
      {chatList.map((textList, index) => (
        <p key={index}>{textList}</p>
      ))}
    </>
  );
};

export default ChatList;
