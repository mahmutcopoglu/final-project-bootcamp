package com.mahmutcopoglu.bankingsystemproject.kafka;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

public class Log {

    private static Logger logger = LogManager.getLogger(Log.class);

    public void info(String message){
        logger.info(message);
    }

    public void warn(String message){
        logger.warn(message);
    }

    public void error(String message){
        logger.error(message);
    }

}
