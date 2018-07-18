package com.SmartGarden.SmartGarden.service.impl;

import com.SmartGarden.SmartGarden.service.EmailService;
import org.springframework.stereotype.Service;

import java.util.Properties;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;


@Service
public class EmailServiceImpl implements EmailService {

    public boolean sendEmail(String recev,int code){
        // 收件人电子邮箱
        String to = recev;

        // 发件人电子邮箱
        String from = "740223702@qq.com";

        // 指定发送邮件的主机为 smtp.qq.com
        String host = "smtp.qq.com";  //QQ 邮件服务器

        // 获取系统属性
        Properties properties = System.getProperties();

        // 设置邮件服务器
        properties.setProperty("mail.smtp.host", host);

        properties.put("mail.smtp.auth", "true");
        // 获取默认session对象
        Session session = Session.getDefaultInstance(properties,new Authenticator(){
            public PasswordAuthentication getPasswordAuthentication()
            {
                return new PasswordAuthentication("740223702@qq.com", "dhbslyhudkwabcge"); //发件人邮件用户名、密码
            }
        });

        try{
            // 创建默认的 MimeMessage 对象
            MimeMessage message = new MimeMessage(session);

            // Set From: 头部头字段
            message.setFrom(new InternetAddress(from));

            // Set To: 头部头字段
            message.addRecipient(Message.RecipientType.TO,
                    new InternetAddress(to));

            // Set Subject: 头部头字段
            message.setSubject("Your code to activate account");

            // 设置消息体
            message.setText("This is your code: "+String.valueOf(code));
            System.out.println("code"+code);

            // 发送消息
            Transport.send(message);
            System.out.println("Sent message successfully....");
            return true;
        }catch (MessagingException mex) {
            mex.printStackTrace();
            return false;
        }
    }

}
