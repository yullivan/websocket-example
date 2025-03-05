package chatserver;

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

}
