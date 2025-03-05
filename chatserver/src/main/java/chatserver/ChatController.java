package chatserver;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {

    @MessageMapping("/chat")
    public void handleMessage(ChatMessage chatMessage) {
        System.out.println(chatMessage);
    }

}
