# Dating_App
# 💘 Dating App

This is a full-stack web application that simulates the core functionalities of a modern dating platform. It is built using **ASP.NET Core Web API** for the backend and **Angular** for the frontend, providing a secure, scalable, and modular architecture.

---

## 📦 Tech Stack

### 🔧 Backend (API)
- ASP.NET Core Web API
- Entity Framework Core (EF Core)
- JWT Authentication
- RESTful API
- SQLite (via `appdata.db`)
- AutoMapper
- Middleware (for error handling, logging, etc.)

### 🎨 Frontend (Client)
- Angular Framework
- TypeScript
- Angular Routing
- Angular Forms
- HTTPS with SSL certificates (dev-only)

---

## 📁 Project Structure

### 📌 API (Backend)
- `Controllers/` – API endpoints (e.g. Auth, Users, Messages)
- `Data/` – DataContext and Seeding logic
- `DTOs/` – Data Transfer Objects for clean API contracts
- `Errors/` – Custom exception handling
- `Extensions/` – Extension methods
- `Helpers/` – Utility classes (e.g. pagination, token service)
- `Interfaces/` – Abstraction layers
- `Middleware/` – Custom middleware (e.g. error handling)
- `Models/` – Database entities (User, Photo, Like, etc.)
- `Services/` – Business logic & authentication services

### 📌 Client (Frontend)
- `src/` – Main Angular application code
- `.angular/` – Angular cache/build info
- `ssl/` – SSL certificates for local dev HTTPS
- `package.json` – Dependency management
- `angular.json` – Angular configuration
- `tsconfig.*.json` – TypeScript configuration

---

## 🚀 Features

- 🔐 **User Authentication** (JWT, secure login/register)
- 👤 **User Profiles** (view, edit, upload photos)
- 💌 **Likes & Matches**
- 💬 **Real-time Messaging** (with SignalR if added)
- 📷 **Photo Uploads** with Cloudinary (optional)
- 📊 **Pagination** and filtering
- 🛡️ **Role-based Authorization** (admin/user)
- 🌐 **RESTful API** with DTO abstraction

