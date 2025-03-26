package chatserver;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {

    @MessageMapping("/chat")
    @SendTo("/topic/room1")
    public ChatMessage handleMessage(ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/rooms/{roomId}")
    public ChatMessage sendMessage(ChatMessage message, @DestinationVariable String roomId) {
        // 메시지 처리 로직
        System.out.println("roomId: " + roomId);
        return message;
    }
}
