-- ----------------------------
-- Populate Courses
-- ----------------------------
INSERT INTO courses (course_code, course_name, units) VALUES
                                                          ('CS101', 'Introduction to Computer Science', 3),
                                                          ('MATH101', 'Calculus I', 4),
                                                          ('PHYS101', 'Physics I', 4),
                                                          ('CHEM101', 'Chemistry I', 3),
                                                          ('ENG101', 'English Composition', 3),
                                                          ('HIST101', 'World History', 3),
                                                          ('BIO101', 'Biology I', 4),
                                                          ('CS102', 'Data Structures', 3),
                                                          ('MATH102', 'Calculus II', 4),
                                                          ('PHIL101', 'Introduction to Philosophy', 3);

-- ----------------------------
-- Populate Roles
-- ----------------------------
INSERT INTO roles (name) VALUES
                             ('ADMIN'),
                             ('STUDENT');

-- ----------------------------
-- Populate Users (BCrypt passwords)
-- Plaintext passwords: password1 ... password10
-- ----------------------------
INSERT INTO users (email, password) VALUES
                                        ('alice@example.com', '$2a$10$kvq8HZy2MbL5f3qy380LOu0tYHPQ.U3ek1YvCbhwHY6SCvoqJiOt6'), -- password1
                                        ('bob@example.com', '$2a$10$aIYt9ZtcOsa2ewAKE4Y/Q.cML/ieeDY60FFY81WLw1JXnKd2qKC.y'),   -- password2
                                        ('charlie@example.com', '$2a$10$z1BMdXaPjV3XOt1qKDsRvONiVGKXJBqiGDQsStZXTkNrrFct8JCgK'),   -- password3
                                        ('david@example.com', '$2a$10$e5Ql1zPu6Ru2Zjrq.7hYAulMks8i1n4LxwzgIM0w4JniC56i.cm4e'),   -- password4
                                        ('eve@example.com', '$2a$10$VaO270J52TJnMaDVPjUllOzIAyvdDxvmMlIJt5ToHncvdhaEYg4qK'),   -- password5
                                        ('frank@example.com', '$2a$10$ZRCqInFnZAOZhqgpWQpgceN0xPrWvwCEzDLMxvs4i4qu1GQkpIH5C'),   -- password6
                                        ('grace@example.com', '$2a$10$YVhh.WGsJhfXV817f8Wejue0H0/T8qEuj4szN6Zyz0cJYuQDFfuWC'),   -- password7
                                        ('heidi@example.com', '$2a$10$Zxk.JiHJM/crAfESAM.aw.ssF/buwMZqDIOlV7tRBMgZyGNVVbKu6'),   -- password8
                                        ('ivan@example.com', '$2a$10$Mj/n/cTUK3hc1/9A0pNBHuqDbDwNUJ3asGInK8fTgADcw9LDcR002'),   -- password9
                                        ('judy@example.com', '$2a$10$SUELSGQjVmFjZgl7YxyS8.YRZcCc/vHJm60tSFEAO4V3/XMQiDzj.');   -- password10

-- ----------------------------
-- Populate Students
-- ----------------------------
INSERT INTO students (user_id, first_name, last_name, year_level) VALUES
                                                                      ((SELECT id FROM users WHERE email='alice@example.com'), 'Alice', 'Smith', 1),
                                                                      ((SELECT id FROM users WHERE email='bob@example.com'), 'Bob', 'Johnson', 2),
                                                                      ((SELECT id FROM users WHERE email='charlie@example.com'), 'Charlie', 'Williams', 3),
                                                                      ((SELECT id FROM users WHERE email='david@example.com'), 'David', 'Brown', 4),
                                                                      ((SELECT id FROM users WHERE email='eve@example.com'), 'Eve', 'Jones', 1),
                                                                      ((SELECT id FROM users WHERE email='frank@example.com'), 'Frank', 'Garcia', 2),
                                                                      ((SELECT id FROM users WHERE email='grace@example.com'), 'Grace', 'Miller', 3),
                                                                      ((SELECT id FROM users WHERE email='heidi@example.com'), 'Heidi', 'Davis', 4),
                                                                      ((SELECT id FROM users WHERE email='ivan@example.com'), 'Ivan', 'Rodriguez', 1),
                                                                      ((SELECT id FROM users WHERE email='judy@example.com'), 'Judy', 'Martinez', 2);

-- ----------------------------
-- Populate Enrollments
-- Each student enrolled in 3 courses
-- ----------------------------
INSERT INTO enrollments (student_id, course_id) VALUES
                                                    (1, 1), (1, 2), (1, 3),
                                                    (2, 1), (2, 4), (2, 5),
                                                    (3, 2), (3, 3), (3, 6),
                                                    (4, 4), (4, 5), (4, 7),
                                                    (5, 1), (5, 6), (5, 8),
                                                    (6, 2), (6, 7), (6, 9),
                                                    (7, 3), (7, 8), (7, 10),
                                                    (8, 4), (8, 5), (8, 1),
                                                    (9, 6), (9, 2), (9, 3),
                                                    (10, 7), (10, 8), (10, 9);

-- ----------------------------
-- Populate User Roles
-- Alternating roles: 1 ADMIN (Alice), rest STUDENT
-- ----------------------------
INSERT INTO user_roles (user_id, role_id) VALUES
                                              ((SELECT id FROM users WHERE email='alice@example.com'), 1), -- ADMIN
                                              ((SELECT id FROM users WHERE email='bob@example.com'), 2),
                                              ((SELECT id FROM users WHERE email='charlie@example.com'), 2),
                                              ((SELECT id FROM users WHERE email='david@example.com'), 2),
                                              ((SELECT id FROM users WHERE email='eve@example.com'), 2),
                                              ((SELECT id FROM users WHERE email='frank@example.com'), 2),
                                              ((SELECT id FROM users WHERE email='grace@example.com'), 2),
                                              ((SELECT id FROM users WHERE email='heidi@example.com'), 2),
                                              ((SELECT id FROM users WHERE email='ivan@example.com'), 2),
                                              ((SELECT id FROM users WHERE email='judy@example.com'), 2);
