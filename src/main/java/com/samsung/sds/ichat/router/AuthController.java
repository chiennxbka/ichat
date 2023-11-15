package com.samsung.sds.ichat.router;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class AuthController {

    @GetMapping("/login")
    public ModelAndView login(ModelMap modelMap) {
        return new ModelAndView("auth-login", modelMap);
    }

    @GetMapping(value = "/logout")
    public ModelAndView logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated())
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        return new ModelAndView("redirect:/login?logout");
    }

    @GetMapping(value = "/register")
    public ModelAndView register(ModelMap modelMap) {
        return new ModelAndView("auth-register", modelMap);
    }

    @GetMapping(value = "/change-password")
    public ModelAndView changePassword(ModelMap modelMap) {
        return new ModelAndView("auth-changepassword", modelMap);
    }

    @GetMapping(value = "/forgot-password")
    public ModelAndView recoveryPassword(ModelMap modelMap) {
        return new ModelAndView("auth-recoverpw", modelMap);
    }
}
