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
  const [chatList, setChatList] = useState<string[]>([]);
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

      // 연결이 되면 room 입장
      client.onConnect = () => {
        console.log("연결 성공!");
        client.subscribe(`/sub/chat/room/${roomId}`, subCallback);
      };

      client.activate();
      setClient(client);
    } catch (error) {
      console.log(error);
    }
  };

  // 주고 받는 메시지 list에 추가
  const subCallback = (message: StompJs.IMessage) => {
    if (message.body) {
      const msg = JSON.parse(message.body);
      setChatList((chats) => [...chats, msg]);
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
      <section className="relative h-full w-[425px] m-auto border border-black">
        <ChatHeader roomId={roomId} exit={disConnect} />
        <InfoBar />
        <div className="min-h-[350px] bg-color-bg">
          <ChatList chatList={chatList} />
        </div>
        <div>
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
