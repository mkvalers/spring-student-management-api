# Spring Student Management API

A RESTful API for managing students, courses, and users, built with **Spring Boot**, **Spring Security**, **Hibernate**, and **MySQL**. Features JWT-based authentication, role-based access control, and full CRUD operations. This API is deployed on **Railway** for live access.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [API Documentation](#api-documentation)
* [Testing with Postman](#testing-with-postman)
* [License](#license)

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

## API Documentation

Explore endpoints and models via Swagger OpenAPI:

[Swagger UI](https://spring-student-management-api-production.up.railway.app/swagger-ui/index.html)

> Use this link to understand all available endpoints, request/response formats, and authentication requirements.

---

## Testing with Postman

Test all API endpoints directly using the provided Postman collection, which points to the live Railway deployment and automatically manages authentication tokens.

[Postman Collection](https://mkvalerio20-2583706.postman.co/workspace/Mark-Valerio's-Workspace~eb7e1ea9-7d0f-4aee-86d5-e9853d984332/collection/48226500-a88149f1-fa27-4448-a369-fb0d69bc0022?action=share&creator=48226500&active-environment=48226500-99d65820-bb09-4b95-99db-68c4771a9e98)

1. Import the collection into Postman.
2. Use the `/auth/login` request to authenticate — the JWT token will automatically be applied to all requests in the collection.
3. Send requests and explore endpoints without any additional setup.

> This is the recommended workflow for interacting with the deployed API.

---

> Made with ❤️ by [Mark Valerio](https://github.com/mkvalers)
