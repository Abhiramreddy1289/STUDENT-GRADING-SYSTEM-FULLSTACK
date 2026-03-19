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
        if (role.equals("STUDENT")) {
            Student s = new Student();
            s.setId(rollNo); s.setName(name); s.setEmail(email); s.setActive(false);
            studentRepository.save(s);
        } else {
            Teacher t = new Teacher();
            t.setEmail(email); t.setName(name); t.setActive(false);
            teacherRepository.save(t);
        }
    }

    public void activateAccount(String email, String password) {
        Optional<Student> s = studentRepository.findAll().stream().filter(st -> st.getEmail().equals(email)).findFirst();
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
        Optional<Student> s = studentRepository.findAll().stream().filter(st -> st.getEmail().equals(email) && st.getPassword().equals(password)).findFirst();
        if (s.isPresent()) return s.get();
        
        Optional<Teacher> t = teacherRepository.findByEmail(email);
        if (t.isPresent() && t.get().getPassword().equals(password)) return t.get();
        
        throw new RuntimeException("Invalid credentials or account not active");
    }
}
