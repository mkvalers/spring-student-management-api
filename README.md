# Spring Student Management API

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A RESTful API for managing students, courses, and users, built with **Spring Boot**, **Spring Security**, **Hibernate**, and **MySQL**. This project includes JWT-based authentication, role-based access control, and full CRUD operations.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Testing with Postman](#testing-with-postman)
- [License](#license)

---

## Features

- User registration and login with JWT authentication.
- Role-based access: `ADMIN` and `STUDENT`.
- CRUD operations for:
  - Students
  - Courses
  - Enrollments
- Detailed validation and error handling.
- Swagger documentation for API exploration.

---

## Tech Stack

- **Backend:** Java 17, Spring Boot
- **Security:** Spring Security, JWT
- **Database:** MySQL / MariaDB
- **ORM:** Hibernate / JPA
- **API Documentation:** Springdoc OpenAPI (Swagger UI)
- **Testing:** Postman

---

## Getting Started

### Prerequisites

- Java 17+
- Maven
- MySQL or MariaDB
- Postman (optional, for testing)

### Clone the Repository

```bash
git clone https://github.com/mkvalers/spring-student-management-api.git
cd spring-student-management-api
