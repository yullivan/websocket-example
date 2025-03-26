"use client";

import { useEffect, useState } from "react";
import { Client, StompSubscription } from "@stomp/stompjs";

export default function Home() {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    Array<{ name: string; message: string }>
  >([]);
  const [roomId, setRoomId] = useState("");
  const [subscription, setSubscription] = useState<StompSubscription | null>(
    null
  );

  const rooms = [
    { id: "111", title: "A" },
    { id: "222", title: "B" },
  ];

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws/chat",
    });

    client.onConnect = () => {
      console.log("연결되었습니다!");
    };

    client.activate();
    setStompClient(client);

    return () => {
      if (client.connected) {
        client.deactivate();
      }
    };
  }, []);

  const joinRoom = (roomId: string) => {
    if (!stompClient) return;

    // 구독 객체 저장
    const sub = stompClient.subscribe(`/topic/rooms/${roomId}`, (message) => {
      console.log("메시지 수신함: ");
      const receivedMessage = JSON.parse(message.body);
      console.log(receivedMessage);
      setMessages((prev) => [...prev, receivedMessage]);
    });

    setSubscription(sub);
    setRoomId(roomId);
    setMessages([]);
    console.log(`채팅방 입장: ${roomId}`);
  };

  const leaveRoom = () => {
    if (subscription) {
      subscription.unsubscribe();
      setSubscription(null);
    }
    setRoomId("");
    console.log(`채팅방 나가기: ${roomId}`);
  };

  return (
    <div>
      <div>WebSocket</div>
      {roomId ? (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // 메시지 전송
              stompClient?.publish({
                destination: `/app/chat/${roomId}`,
                body: JSON.stringify({ name, message }),
              });
              setMessage(""); // 메시지 전송 후 입력창 초기화
            }}
          >
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="이름"
            />
            <input
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="메시지"
            />
            <button type="submit">전송</button>
          </form>
          <button onClick={leaveRoom}>채팅방 나가기</button>

          {/* 메시지 표시 영역 */}
          <div style={{ marginTop: "20px" }}>
            {messages.map((msg, idx) => (
              <div key={idx}>
                <strong>{msg.name}:</strong> {msg.message}
              </div>
            ))}
          </div>
        </div>
      ) : (
        rooms.map((room) => (
          <div key={room.id}>
            <button onClick={() => joinRoom(room.id)}>
              채팅방 {room.title} 입장
            </button>
          </div>
        ))
      )}
    </div>
  );
}
