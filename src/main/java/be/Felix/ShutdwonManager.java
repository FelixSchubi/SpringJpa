// package be.Felix;


// import org.springframework.context.ApplicationContext;
// import org.springframework.stereotype.Component;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.SpringApplication;


// public class ShutdownManager{

//     @Autowired
//     private ApplicationContext appContext;

//     public void initiateShutdown(int returnCode){
//         SpringApplication.exit(appContext, () -> returnCode);
//     }
// }