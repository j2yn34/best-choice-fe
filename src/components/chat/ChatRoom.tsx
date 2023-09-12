import {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { accessTokenState, userInfoState } from "../../states/recoil";
import * as StompJs from "@stomp/stompjs";
import ChatHeader from "./ChatHeader";
import InfoBar from "./InfoBar";
import ChatList from "./ChatList";
import MessageForm from "./MessageForm";

const Chat = (): JSX.Element => {
  const token = useRecoilValue<string>(accessTokenState);
  const userData = useRecoilValue(userInfoState);

  const [client, setClient] = useState<StompJs.Client | null>(null);
  const [chatList, setChatList] = useState([{ sender: null, chat: null }]);
  const [message, setMessage] = useState<string>("");

  const param = useParams();
  // postId 가져오기
  if (!param.postId) {
    throw new Error("postId가 없어요");
  }
  const roomId = param.postId;

  // 소켓 연결
  const connect = () => {
    try {
      const client = new StompJs.Client({
        brokerURL: "ws://www.winnow-bestchoice.com:8080/ws-stomp",
        connectHeaders: {
          token: token,
        },
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      client.onConnect = () => {
        console.log("연결 성공!");
        client.subscribe(`/sub/chat/room/${roomId}`, subCallback, {
          token: token,
        });
      };

      client.activate();
      setClient(client);
    } catch (error) {
      console.log(error);
    }
  };

  // 주고 받는 메시지 list에 추가
  const subCallback = (res: StompJs.IMessage) => {
    if (res.body) {
      const { sender, message } = JSON.parse(res.body);
      setChatList((prev) => [...prev, { sender: sender, chat: message }]);
      console.log(`sender: ${sender}`);
    }
  };

  const onChangeText = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setMessage(value);
  }, []);

  const sendMessage = () => {
    if (message === "") {
      return;
    }

    // 메시지 전송 -> type = TALK
    client?.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify({
        type: "TALK",
        roomId: roomId,
        sender: userData.nickname,
        message: message,
      }),
    });

    setMessage("");
  };

  const onSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    sendMessage();
  };

  const disConnect = () => {
    if (client === null) {
      return;
    }
    client.deactivate();
    alert("채팅방에서 나갑니다.");
  };

  // 소켓 연결 끊기
  useEffect(() => {
    console.log(roomId);
    connect();

    return () => disConnect();
  }, []);

  return (
    <>
      <section className="relative h-screen min-h-[500px] w-full md:w-[425px] m-auto border border-black">
        <ChatHeader roomId={roomId} exit={disConnect} />
        <InfoBar />
        <div className="flex flex-col justify-between h-[calc(100%-64px)]">
          <div className="overflow-y-scroll bg-color-bg">
            <ChatList chatList={chatList} />
          </div>
          <MessageForm
            message={message}
            submitMsg={onSubmit}
            changeMsg={onChangeText}
          />
        </div>
      </section>
    </>
  );
};

export default Chat;
