# Placement Preparation Tracker

## 📌 Project Description

Placement Preparation Tracker is a full-stack web application designed to help students organize and track their placement preparation activities in one place.

The application allows students to manage company information, job applications, preparation topics, and interview records. It also provides a dashboard to view important placement-related information and overall preparation progress.

The project is developed using React for the frontend, Spring Boot for the backend, and MySQL for database management.

---

## 🎯 Objectives

- To provide a single platform for managing placement preparation.
- To maintain company and application details.
- To track preparation topics and progress.
- To maintain interview records and feedback.
- To perform CRUD operations using REST APIs.
- To store application data permanently in a MySQL database.
- To provide a simple and user-friendly interface for students.

---

## 🚀 Features

### 🏠 Dashboard
- Displays the total number of companies.
- Displays the total number of applications.
- Displays the total number of interviews.
- Displays the number of selected applications.
- Displays overall preparation progress.

### 🏢 Company Management
- Add company details.
- View company details.
- Edit company details.
- Delete company details.
- Search companies.

### 📝 Application Management
- Add job application details.
- View application records.
- Edit application details.
- Delete applications.
- Search applications.
- Filter applications by status.

### 📚 Preparation Management
- Add preparation topics.
- View preparation records.
- Edit preparation details.
- Delete preparation records.
- Search preparation topics.
- Filter topics by category.
- Track preparation progress.

### 🎤 Interview Management
- Add interview details.
- View interview records.
- Edit interview details.
- Delete interview records.
- Store interview results and feedback.

### ✅ Validation
- Required fields are validated before data is saved.
- Backend validation is implemented using Jakarta Validation.

### ⚠️ Exception Handling
- Global exception handling is implemented.
- Resource-not-found errors are handled.
- Validation errors return appropriate responses.

---

## 🛠️ Technologies Used

### Frontend
- React
- JavaScript
- HTML
- CSS
- Vite

### Backend
- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- Jakarta Validation

### Database
- MySQL

### Tools
- Visual Studio Code
- MySQL Workbench
- Postman
- Git
- GitHub

---

## 🏗️ System Architecture

```text
                User
                  |
                  ↓
          React Frontend
                  |
                  ↓
             REST API
                  |
                  ↓
           Spring Boot
                  |
                  ↓
       Spring Data JPA
                  |
                  ↓
        Hibernate ORM
                  |
                  ↓
          MySQL Database