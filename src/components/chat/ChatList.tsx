const ChatList = ({
  chatList,
  userNickname,
}: {
  chatList: { sender: string | null; chat: string | null }[];
  userNickname: string;
}): JSX.Element => {
  const ChatListContent = chatList.map((chat, index) => {
    const isUser = chat.sender === userNickname;

    return (
      chat.sender !== null && (
        <div key={index}>
          <div
            className={`flex flex-col p-1 chat mb-1 ${
              isUser ? "chat-end" : "chat-start"
            }`}
          >
            <div className={`chat-header mb-1 ${isUser && "hidden"}`}>
              {chat.sender}
            </div>
            <div className={`flex items-end ${!isUser && "flex-row-reverse"}`}>
              <time
                className={`text-xs opacity-50 ${isUser ? "mr-1" : "ml-1"}`}
              >
                00:00
              </time>
              <div
                className={`chat-bubble shadow-sm ${
                  isUser ? "bg-blue-300" : "bg-white"
                }`}
              >
                {chat.chat}
              </div>
            </div>
          </div>
        </div>
      )
    );
  });

  return <div className="pt-20 px-2">{ChatListContent}</div>;
};

export default ChatList;
