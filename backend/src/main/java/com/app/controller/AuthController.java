package com.app.controller;

import com.app.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private AuthService authService;

    @PostMapping("/pre-register")
    public ResponseEntity<?> preRegister(@RequestBody Map<String, String> data) {
        try {
            authService.preRegister(data.get("email"), data.get("name"), data.get("role"), data.get("rollNo"));
            return ResponseEntity.ok().body(Map.of("message", "Registration successful"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/activate")
    public ResponseEntity<?> activate(@RequestBody Map<String, String> data) {
        try {
            authService.activateAccount(data.get("email"), data.get("password"));
            return ResponseEntity.ok().body(Map.of("message", "Account activated"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> data) {
        try {
            return ResponseEntity.ok(authService.login(data.get("email"), data.get("password")));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("message", e.getMessage()));
        }
    }
}
