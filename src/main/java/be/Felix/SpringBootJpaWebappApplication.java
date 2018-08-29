package be.Felix;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringBootJpaWebappApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringBootJpaWebappApplication.class, args);
    }


    // public void initiateShutdown(String[] args){
    //             SpringApplication.run(SpringBootJpaWebappApplication.class, args).close();
    //         }
  
}
