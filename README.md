# Spring Student Management API

A RESTful API for managing students, courses, and users, built with **Spring Boot**, **Spring Security**, **Hibernate**, and **MySQL**. Features JWT-based authentication, role-based access control, and full CRUD operations. This API is deployed on **Railway** for live access.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Optional Local Setup](#optional-local-setup)
* [API Documentation](#api-documentation)
* [Authentication & Testing](#authentication--testing)

---

## Features

* User registration and login with JWT authentication.
* Role-based access: `ADMIN` and `STUDENT`.
* CRUD operations for Students, Courses, and Enrollments.
* Validation and error handling.
* Swagger OpenAPI documentation for easy exploration.
* Deployed on **Railway** for live access.

---

## Tech Stack

* **Backend:** Java 17, Spring Boot
* **Security:** Spring Security, JWT
* **Database:** MySQL
* **ORM:** Hibernate / JPA
* **API Documentation:** Springdoc OpenAPI (Swagger UI)
* **Hosting/Deployment:** Railway
* **Testing:** Postman

---

## Optional Local Setup

If you want to run the project locally for development or testing:

1. **Clone the repository:**

```bash
git clone https://github.com/mkvalers/spring-student-management-api.git
cd spring-student-management-api
```

2. **Set environment variables** in a `.env` file or directly in `application.yml-dev`:

```properties
DATABASE_URL=jdbc:mysql://localhost:3306/school_api_db?createDatabaseIfNotExist=true
DATABASE_USER=root
DATABASE_PASS=password
JWT_SECRET=your_jwt_secret_key
```

3. **Run the application:**

```bash
mvn clean install
mvn spring-boot:run
```

> Local setup is optional. For most users, the Postman collection with the live Railway deployment is sufficient.

---

## API Documentation

Explore endpoints and models via Swagger OpenAPI:

[Swagger UI](https://spring-student-management-api-production.up.railway.app/swagger-ui/index.html)

> Use this link to understand all available endpoints, request/response formats, and authentication requirements.

---

## Authentication & Testing

The API uses **JWT-based authentication**. The provided Postman collection handles authentication automatically:

* Use the `/auth/register` endpoint to create a new user if desired.
* The database is **pre-populated** with 10 test user accounts, including **1 admin**. You can use these accounts for testing without registering new users.

### Example Test Accounts

| Role    | Email                                               | Password   |
| ------- | --------------------------------------------------- | ---------- |
| Admin   | [alice@example.com](mailto:admin@example.com)       | password1  |
| Student | [bob@example.com](mailto:student1@example.com)      | password2  |

* Log in via `/auth/login` — the JWT token is automatically captured and stored in a Postman collection variable.
* All requests in the collection that require authentication will automatically use this token.

This setup allows you to explore and test the API immediately using the provided accounts, without manually setting headers or tokens.

[Postman Collection](https://mkvalerio20-2583706.postman.co/workspace/Mark-Valerio's-Workspace~eb7e1ea9-7d0f-4aee-86d5-e9853d984332/collection/48226500-a88149f1-fa27-4448-a369-fb0d69bc0022?action=share&creator=48226500&active-environment=48226500-99d65820-bb09-4b95-99db-68c4771a9e98)

---

> Made with ❤️ by [Mark Valerio](https://github.com/mkvalers)
