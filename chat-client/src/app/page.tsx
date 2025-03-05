"use client";

import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

export default function Home() {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws/chat",
    });

    client.onConnect = () => {
      console.log("연결되었습니다!");
      client.subscribe("/topic/room1", (message) => {
        console.log("메시지 수신함: ");
        console.log(message.body);
      });
    };

    client.activate();
    setStompClient(client);
  }, []);

  return (
    <div>
      <div>WebSocket</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          stompClient?.publish({
            destination: "/app/chat",
            body: JSON.stringify({ name, message }),
          });
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
    </div>
  );
}
