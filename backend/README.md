# Spring Student Management API

A RESTful API for managing students, courses, and enrollments, built with **Spring Boot**, **Spring Security**, **Hibernate**, and **MySQL**. Features JWT-based authentication, role-based access control, and full CRUD operations.

---

## Table of Contents

- [Live Deployment](#live-deployment)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [API Overview](#api-overview)
- [Local Setup](#local-setup)
- [API Documentation](#api-documentation)
- [Testing](#testing)

---

## Live Deployment

The API is deployed on **Railway** and is publicly accessible:

🔗 [https://spring-student-management-api-production.up.railway.app](https://spring-student-management-api-production.up.railway.app)

---

## Features

- User registration and login with **JWT access token** authentication (2-hour expiry)
- Role-based access control: `ADMIN` and `STUDENT`
- CRUD operations for Students, Courses, and Enrollments
- Role-aware responses — e.g. `GET /courses/{courseCode}` returns enrolled students only for `ADMIN`
- Student self-service profile — view and update own email/password
- Admin profile management — admin can update own password
- Centralized exception handling with consistent error responses
- Input validation with descriptive constraint messages
- Swagger OpenAPI documentation

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | Java 17 |
| Framework | Spring Boot |
| Security | Spring Security, JWT |
| Database | MySQL |
| ORM | Hibernate / JPA |
| API Docs | Springdoc OpenAPI (Swagger UI) |
| Deployment | Railway |
| Testing | JUnit 5, Mockito, Postman |

---

## Architecture

The project follows a standard layered architecture with feature-based packaging:

```
Controller → Service → Repository
```

- **DTOs** are used for all request/response separation
- **Mappers** handle entity ↔ DTO conversion
- **Security rules** are defined per feature package
- **Global exception handler** returns consistent `ErrorDto` responses
- **JWT filter** validates tokens on every protected request

---

## Project Structure

```
src/main/java/com/mkv/studentmanagementapi/
├── authentication/        # Register, login, JWT token handling
├── common/                # Security config, JWT filter, global exception handler
├── course/                # Course CRUD, role-aware responses
├── enrollment/            # Student enrollment management
├── student/               # Student records (admin-only)
├── user/                  # User profile endpoints for student and admin
└── StudentManagementApiApplication.java
```

---

## API Overview

All endpoints require a `Bearer` JWT token in the `Authorization` header unless marked as **Public**.

### Authentication — `/auth`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/auth/register` | Public | Register a new user |
| `POST` | `/auth/login` | Public | Login and receive a JWT token |

### Users — `/users`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/users/me` | STUDENT | Get logged-in student profile |
| `PUT` | `/users/me` | STUDENT | Update own email or password |
| `GET` | `/users/admin/me` | ADMIN | Get logged-in admin profile |
| `PUT` | `/users/admin/me` | ADMIN | Update own password |

### Courses — `/courses`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/courses` | STUDENT, ADMIN | Get all courses |
| `GET` | `/courses/{courseCode}` | STUDENT, ADMIN | Get course by code — students field included only for ADMIN |
| `POST` | `/courses` | ADMIN | Create a new course |
| `PUT` | `/courses/{courseCode}` | ADMIN | Update a course |
| `DELETE` | `/courses/{courseCode}` | ADMIN | Delete a course |

### Enrollments — `/enrollments`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/enrollments/me` | STUDENT | Get own enrollments |
| `POST` | `/enrollments` | STUDENT | Enroll in a course |
| `DELETE` | `/enrollments/{enrollmentId}` | STUDENT | Drop a course |

### Students — `/students`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/students` | ADMIN | Get all students with optional filters and pagination |
| `GET` | `/students/{id}` | ADMIN | Get a student by ID |

---

## Local Setup

> Local setup is optional. The live Railway deployment with the Postman collection is sufficient for most users.

1. **Clone the repository:**

```bash
git clone https://github.com/mkvalers/spring-student-management-api.git
cd spring-student-management-api/backend
```

2. **Set environment variables** in `application-dev.yml` or a `.env` file:

```properties
DATABASE_URL=localhost:3306
DATABASE_USER=your_username
DATABASE_PASS=your_password
JWT_SECRET=your_jwt_secret_key
```

3. **Run the application:**

```bash
mvn clean install
mvn spring-boot:run
```

---

## API Documentation

Interactive API docs are available via Swagger UI:

📄 [https://spring-student-management-api-production.up.railway.app/swagger-ui/index.html](https://spring-student-management-api-production.up.railway.app/swagger-ui/index.html)

---

## Testing

The API uses **JWT-based authentication**. The Postman collection handles token capture and injection automatically.

### Pre-populated Test Accounts

The database includes 10 test accounts (1 admin, 9 students):

| Role | Email | Password |
|---|---|---|
| Admin | alice@example.com | password1 |
| Student | bob@example.com | password2 |

- Login via `POST /auth/login` — the JWT token is automatically stored as a Postman collection variable
- All authenticated requests in the collection use this token automatically

🔗 [Postman Collection](https://mkvalerio20-2583706.postman.co/workspace/Mark-Valerio's-Workspace~eb7e1ea9-7d0f-4aee-86d5-e9853d984332/collection/48226500-a88149f1-fa27-4448-a369-fb0d69bc0022?action=share&creator=48226500&active-environment=48226500-99d65820-bb09-4b95-99db-68c4771a9e98)
