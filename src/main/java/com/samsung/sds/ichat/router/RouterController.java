package com.samsung.sds.ichat.router;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class RouterController {

    @GetMapping
    public ModelAndView home(ModelMap modelMap){
        return new ModelAndView("index", modelMap);
    }
}
