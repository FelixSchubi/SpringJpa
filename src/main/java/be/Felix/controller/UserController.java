package be.Felix.controller;

import be.Felix.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller

public class UserController {
    @Autowired
    private UserRepository repository;

 
    @RequestMapping("/User")
    public ModelAndView getUser() {
        return new ModelAndView("user", "user", repository.findAll());
    }

    

}