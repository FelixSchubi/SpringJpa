package be.Felix.controller;


import org.springframework.stereotype.Controller;
// import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class FelixController {

    @RequestMapping("/polymer")
    public ModelAndView polymer () {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("polymer");
        return modelAndView;
    }

    @RequestMapping(value="/goHome", params={"goHome"})
        public String goHome() {
    return "index";
}
    
}