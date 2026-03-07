package com.wepopiks.wedding.frontend.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MainController {
    @GetMapping("/")
    public String getMainPage(HttpSession session) {
        return "mainPage";
    }

    @GetMapping("/invite")
    public String invite(
            @RequestParam(value = "guest") String guest,
            @RequestParam(value = "add", required = false) String add,
            HttpSession session) {

        if (guest != null && !guest.isBlank()) {
            session.setAttribute("guest", guest);
        } else {
            session.removeAttribute("guest");
        }

        if (add != null && !add.isBlank()) {
            session.setAttribute("add", add);
        } else {
            session.removeAttribute("add");
        }

        return "redirect:/";
    }

//    @GetMapping("/invite2")
//    public String invite2(
//            @RequestParam(value = "guestId") String guest,
//            HttpSession session) {
//
//        if (guest != null && !guest.isBlank()) {
//            session.setAttribute("guest", guest);
//        } else {
//            session.removeAttribute("guest");
//        }
//
//        if (add != null && !add.isBlank()) {
//            session.setAttribute("add", add);
//        } else {
//            session.removeAttribute("add");
//        }
//
//        return "redirect:/";
//    }

//    @GetMapping("/administrated")
//    public String getAdminPage(HttpSession session) {
//        return "admin";
//    }
}
