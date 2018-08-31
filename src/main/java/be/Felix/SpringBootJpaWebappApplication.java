package be.Felix;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringBootJpaWebappApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringBootJpaWebappApplication.class, args);


        OpenBrowser Chrome = new OpenBrowser();
        // Auskommentieren wenn der Browser nicht jedes mal geöffnet werden soll
        Chrome.executeBashCommand("google-chrome http://localhost:5050");
    }


    // public void initiateShutdown(String[] args){
    //             SpringApplication.run(SpringBootJpaWebappApplication.class, args).close();
    //         }
  
}
