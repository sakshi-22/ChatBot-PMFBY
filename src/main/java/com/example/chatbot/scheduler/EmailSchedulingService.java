package com.example.chatbot.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class EmailSchedulingService {

    @Scheduled(cron = "0 48 17 * * ?") // Schedule daily at 5:48 PM
    public void sendDailyEmail() {
        DailyEmailScheduler.sendDailyEmail();
    }
}