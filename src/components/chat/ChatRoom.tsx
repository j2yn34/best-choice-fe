import {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { accessTokenState, userInfoState } from "../../states/recoil";
import * as StompJs from "@stomp/stompjs";
import useFetchData from "../../hooks/useFetchData";
import ChatHeader from "./ChatHeader";
import InfoBar from "./InfoBar";
import ChatList from "./ChatList";
import MessageForm from "./MessageForm";

const Chat = (): JSX.Element => {
  const token = useRecoilValue<string>(accessTokenState);
  const userData = useRecoilValue(userInfoState);

  const [client, setClient] = useState<StompJs.Client | null>(null);
  const [chatList, setChatList] = useState([
    { sender: null, chat: null, type: null, sendTime: null, userCount: 0 },
  ]);
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  const param = useParams();
  if (!param.postId) {
    throw new Error("postId가 없어요");
  }
  const roomId = param.postId;

  const { data: roomData } = useFetchData(
    `/api/posts/${roomId}`,
    [`postData${roomId}`],
    token
  );

  const connect = () => {
    try {
      const client = new StompJs.Client({
        brokerURL: "wss://www.winnow-bestchoice.com:443/ws-stomp",
        connectHeaders: {
          token: token,
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      client.onConnect = () => {
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

  const subCallback = (res: StompJs.IMessage) => {
    if (res.body) {
      const { sender, message, type, sendTime, userCount } = JSON.parse(
        res.body
      );

      if (userCount === 0) {
        disConnect();
        alert("채팅방이 종료되었습니다.");
        return navigate(-1);
      }

      setChatList((prev) => [
        ...prev,
        {
          sender: sender,
          chat: message,
          type: type,
          sendTime: sendTime,
          userCount: userCount,
        },
      ]);
    }
  };

  const onChangeText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMessage(value);
  }, []);

  const sendMessage = () => {
    if (message === "") {
      return;
    }

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
  };

  // 소켓 연결 끊기
  useEffect(() => {
    connect();

    return () => {
      disConnect();
      alert("채팅방에서 나갑니다.");
    };
  }, []);

  return (
    <>
      <section className="relative h-screen min-h-[500px] w-full md:w-[425px] m-auto">
        <ChatHeader
          roomId={roomId}
          exit={disConnect}
          chatList={chatList}
          roomData={roomData}
        />
        <InfoBar roomData={roomData} />
        <div className="flex flex-col justify-between h-[calc(100%-64px)] bg-blue-100">
          <ChatList chatList={chatList} userNickname={userData.nickname} />
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
