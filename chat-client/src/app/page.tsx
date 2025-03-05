"use client";

import { useEffect } from "react";
import { Client } from "@stomp/stompjs";

export default function Home() {
  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws/chat",
    });

    client.onConnect = () => {
      console.log("연결되었습니다!");
    };

    client.activate();
  }, []);

  return (
    <div>
      <div>WebSocket</div>
    </div>
  );
}
