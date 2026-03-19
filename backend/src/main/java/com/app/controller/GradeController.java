package com.app.controller;

import com.app.entity.Grade;
import com.app.service.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/grades")
public class GradeController {

    @Autowired
    private GradeService gradeService;

    @PostMapping
    public Grade addGrade(@RequestBody Map<String, Object> payload) {
        String studentId = payload.get("studentId").toString();
        String subject = (String) payload.get("subject");
        Integer marks = (Integer) payload.get("marks");
        return gradeService.calculateAndSaveGrade(studentId, subject, marks);
    }

    @GetMapping
    public List<Grade> getAllGrades() {
        return gradeService.getAllGrades();
    }
}
