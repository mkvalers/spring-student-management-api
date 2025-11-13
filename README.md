# Spring Student Management API

A RESTful API for managing students, courses, and users, built with **Spring Boot**, **Spring Security**, **Hibernate**, and **MySQL**. Features JWT-based authentication, role-based access control, and full CRUD operations.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Configuration](#configuration)
* [Running the Application](#running-the-application)
* [API Documentation](#api-documentation)
* [Authentication](#authentication)
* [Testing with Postman](#testing-with-postman)
* [License](#license)

---

## Features

* User registration and login with JWT authentication.
* Role-based access: `ADMIN` and `STUDENT`.
* CRUD operations for Students, Courses, and Enrollments.
* Validation and error handling.
* Swagger OpenAPI documentation for easy exploration.

---

## Tech Stack

* **Backend:** Java 17, Spring Boot
* **Security:** Spring Security, JWT
* **Database:** MySQL / MariaDB
* **ORM:** Hibernate / JPA
* **API Documentation:** Springdoc OpenAPI (Swagger UI)
* **Testing:** Postman

---

## Getting Started

### Prerequisites

* Java 17+
* Maven
* MySQL
* Postman (optional, for testing)

### Clone the Repository

```bash
git clone https://github.com/mkvalers/spring-student-management-api.git
cd spring-student-management-api
```

---

## Configuration

Create a `.env` or set environment variables for database connection:

```properties
DATABASE_URL=jdbc:mysql://localhost:3306/school_api?createDatabaseIfNotExist=true
DATABASE_USER=root
DATABASE_PASS=password
JWT_SECRET=your_jwt_secret_key
```

> For development, credentials can also be hardcoded in `application.yml-dev`

---

## Running the Application

Build and run with Maven:

```bash
mvn clean install
mvn spring-boot:run
```

The API will be available at:

```
http://localhost:8080/
```

---

## API Documentation

Explore endpoints via Swagger OpenAPI:

[Swagger UI](https://spring-student-management-api-production.up.railway.app/swagger-ui/index.html)

The documentation includes all endpoints, models, and authentication requirements.

---

## Authentication

* Obtain a JWT token by logging in.
* Include the token in the `Authorization` header for protected endpoints:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## Testing with Postman

Import the Postman collection to test all endpoints:

[Postman Collection](https://mkvalerio20-2583706.postman.co/workspace/Mark-Valerio's-Workspace~eb7e1ea9-7d0f-4aee-86d5-e9853d984332/collection/48226500-a88149f1-fa27-4448-a369-fb0d69bc0022?action=share&creator=48226500&active-environment=48226500-99d65820-bb09-4b95-99db-68c4771a9e98)

1. Import the collection into Postman.
2. Authenticate using `/auth/login` to get the JWT token.
3. Set the token in `Authorization` header for subsequent requests.

---

> Made with ❤️ by [Mark Valerio](https://github.com/mkvalers)
