const ChatList = ({
  chatList,
}: {
  chatList: { sender: string | null; chat: string | null }[];
}): JSX.Element => {
  return (
    <div className="pt-20 px-2">
      {chatList.map((chat, index) => (
        <>
          {chat.sender !== null && (
            <div key={index}>
              <div className="flex flex-col p-1 chat chat-start mb-1">
                <div className="chat-header mb-1">{chat.sender}</div>
                <div className="flex items-end">
                  <div className="chat-bubble bg-blue-200">{chat.chat}</div>
                  <time className="text-xs opacity-50 ml-1">00:00</time>
                </div>
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default ChatList;
