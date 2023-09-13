import { useEffect, useRef } from "react";

const ChatList = ({
  chatList,
  userNickname,
}: {
  chatList: {
    sender: string | null;
    chat: string | null;
    type: string | null;
    sendTime: string | null;
    userCount: number | null;
  }[];
  userNickname: string;
}): JSX.Element => {
  const chatListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [chatList]);

  const ChatListContent = chatList.map((chat, index) => {
    const isUser = chat.sender === userNickname;
    const [firstTime, secondTime] = chat.sendTime?.split(" ")[1].split(":") || [
      "00",
      "00",
    ];
    const isNotification = chat.type === "ENTER" || chat.type === "QUIT";

    return (
      chat.sender !== null && (
        <div key={index}>
          {isNotification ? (
            <div className="text-center mb-2">
              <p className="text-sm opacity-50">{chat.chat}</p>
            </div>
          ) : (
            <>
              <div
                className={`flex flex-col p-1 chat mb-1 ${
                  isUser ? "chat-end" : "chat-start"
                }`}
              >
                <div className={`chat-header mb-1 ${isUser && "hidden"}`}>
                  {chat.sender}
                </div>
                <div
                  className={`flex items-end ${!isUser && "flex-row-reverse"}`}
                >
                  <time
                    className={`text-xs opacity-50 ${isUser ? "mr-1" : "ml-1"}`}
                  >
                    {firstTime}:{secondTime}
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
            </>
          )}
        </div>
      )
    );
  });

  return (
    <div className="pt-20 px-2 overflow-y-scroll" ref={chatListRef}>
      {ChatListContent}
    </div>
  );
};

export default ChatList;
