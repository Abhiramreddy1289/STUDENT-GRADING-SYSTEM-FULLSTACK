package com.app.service;

import com.app.entity.Student;
import com.app.entity.Teacher;
import com.app.repository.StudentRepository;
import com.app.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired private StudentRepository studentRepository;
    @Autowired private TeacherRepository teacherRepository;

    public void preRegister(String email, String name, String role, String rollNo) {
        String trimmedEmail = email != null ? email.trim() : "";
        String trimmedName = name != null ? name.trim() : "";
        String trimmedRollNo = rollNo != null ? rollNo.trim().toUpperCase() : "";

        if (role.equals("STUDENT")) {
            if (studentRepository.existsById(trimmedRollNo)) {
                throw new RuntimeException("Roll Number " + trimmedRollNo + " is already registered.");
            }
            if (studentRepository.findByEmail(trimmedEmail).isPresent()) {
                throw new RuntimeException("Email " + trimmedEmail + " is already registered to a student.");
            }
            Student s = new Student();
            s.setId(trimmedRollNo); s.setName(trimmedName); s.setEmail(trimmedEmail); s.setActive(false);
            try {
                studentRepository.save(s);
            } catch (Exception e) {
                throw new RuntimeException("Failed to save student: " + e.getMessage());
            }
        } else {
            if (teacherRepository.existsById(trimmedEmail)) {
                throw new RuntimeException("Teacher email " + trimmedEmail + " is already registered.");
            }
            Teacher t = new Teacher();
            t.setEmail(trimmedEmail); t.setName(trimmedName); t.setActive(false);
            try {
                teacherRepository.save(t);
            } catch (Exception e) {
                throw new RuntimeException("Failed to save teacher: " + e.getMessage());
            }
        }
    }

    public void activateAccount(String email, String password) {
        Optional<Student> s = studentRepository.findByEmail(email);
        if (s.isPresent()) {
            Student student = s.get();
            student.setPassword(password); student.setActive(true);
            studentRepository.save(student);
            return;
        }
        Optional<Teacher> t = teacherRepository.findByEmail(email);
        if (t.isPresent()) {
            Teacher teacher = t.get();
            teacher.setPassword(password); teacher.setActive(true);
            teacherRepository.save(teacher);
        } else {
            throw new RuntimeException("Email not pre-registered by admin");
        }
    }

    public Object login(String email, String password) {
        Optional<Student> s = studentRepository.findByEmail(email);
        if (s.isPresent() && s.get().getPassword().equals(password)) return s.get();
        
        Optional<Teacher> t = teacherRepository.findByEmail(email);
        if (t.isPresent() && t.get().getPassword().equals(password)) return t.get();
        
        throw new RuntimeException("Invalid credentials or account not active");
    }
}
