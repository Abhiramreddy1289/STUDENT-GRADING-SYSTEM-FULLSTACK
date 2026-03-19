package com.app.controller;

import com.app.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private AuthService authService;

    @PostMapping("/pre-register")
    public void preRegister(@RequestBody Map<String, String> data) {
        authService.preRegister(data.get("email"), data.get("name"), data.get("role"), data.get("rollNo"));
    }

    @PostMapping("/activate")
    public void activate(@RequestBody Map<String, String> data) {
        authService.activateAccount(data.get("email"), data.get("password"));
    }

    @PostMapping("/login")
    public Object login(@RequestBody Map<String, String> data) {
        return authService.login(data.get("email"), data.get("password"));
    }
}
