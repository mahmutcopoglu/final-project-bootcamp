package com.mahmutcopoglu.bankingsystemproject.kafka;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component
public class Consumer {

    Log log = new Log();

    @KafkaListener(topics = { "log" }, groupId = "log_group")
    public void listenTransfer(@Payload String message) {

        String[] parsedText = message.split(" ");
        if(parsedText[1].contains("deposit")) {
            var sendLogMessage = parsedText[0] + "," + message.split("amount:")[1] + " deposited";
            log.info(sendLogMessage);

        }else {
            var sendLogMessage = ((message.split(",")[0]).split("amount:")[1]) + " , " +parsedText[0]+" to "+ message.split("transferred_account:")[1] + ": transferred";
            log.info(sendLogMessage);
        }


    }

}