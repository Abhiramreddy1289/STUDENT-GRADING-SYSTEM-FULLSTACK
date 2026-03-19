package com.app.service;

import com.app.entity.Grade;
import com.app.entity.Student;
import com.app.repository.GradeRepository;
import com.app.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GradeService {

    @Autowired
    private GradeRepository gradeRepository;

    @Autowired
    private StudentRepository studentRepository;

    public Grade calculateAndSaveGrade(String studentId, String subject, Integer marks) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Grade grade = gradeRepository.findByStudentIdAndSubject(studentId, subject)
                .orElse(new Grade());
        
        grade.setStudent(student);
        grade.setSubject(subject);
        grade.setMarks(marks);
        grade.setGradeLetter(determineGradeLetter(marks));

        return gradeRepository.save(grade);
    }

    private String determineGradeLetter(Integer marks) {
        if (marks >= 90) return "A";
        if (marks >= 80) return "B";
        if (marks >= 70) return "C";
        if (marks >= 60) return "D";
        return "F";
    }

    public List<Grade> getAllGrades() {
        return gradeRepository.findAll();
    }

    public List<Grade> getGradesByStudent(String studentId) {
        return gradeRepository.findByStudentId(studentId);
    }
}
