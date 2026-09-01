# Auth & RBAC API

Backend authentication with JWT and role-based access control.

## Roles

| Role | Description |
|------|-------------|
| **admin** | Full access — manage users, all tasks |
| **employee** | Manage own profile and own tasks |

## Setup

1. Copy `.env.example` to `.env` and fill in values
2. `npm install`
3. `npm run dev`

## Auth header

Protected routes require:

```
Authorization: Bearer <your_jwt_token>
```

---

## API Routes

### Auth — `/api/auth`

| Method | Path | Access | Description |
|--------|------|--------|-------------|
| POST | `/register` | Public | Register as **employee** |
| POST | `/login` | Public | Login, returns JWT |
| GET | `/me` | Protected | Current user + permissions |
| PUT | `/profile` | Protected | Update own profile |
| PUT | `/password` | Protected | Change password |

**Register body:**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@company.com",
  "password": "password123",
  "department": "Engineering",
  "jobTitle": "Developer"
}
```

**Login body:**
```json
{
  "email": "jane@company.com",
  "password": "password123"
}
```

---

### Users — `/api/users` (Admin only)

| Method | Path | Permission | Description |
|--------|------|------------|-------------|
| GET | `/` | view:users | List users (filter: `?role=employee&search=jane`) |
| POST | `/` | manage:users | Create user with any role |
| GET | `/:id` | view:users | Get one user |
| PUT | `/:id` | manage:users | Update user |
| DELETE | `/:id` | manage:users | Deactivate user (soft delete) |
| PATCH | `/:id/role` | update:user_role | Change role |
| PATCH | `/:id/status` | deactivate:user | Activate / deactivate |

**Admin create user body:**
```json
{
  "firstName": "Admin",
  "lastName": "User",
  "email": "admin@company.com",
  "password": "securepass123",
  "role": "admin",
  "department": "Management"
}
```

---

### Tasks — `/api/tasks` (Protected)

| Method | Path | Who can access |
|--------|------|----------------|
| GET | `/` | Admin: all tasks · Employee: own tasks |
| POST | `/` | Any authenticated user |
| GET | `/:id` | Owner or admin |
| PUT | `/:id` | Owner or admin (reassign: admin only) |
| DELETE | `/:id` | Creator or admin |

---

## Folder structure

```
server/
  config/roles.js          ← roles & permissions map
  controllers/
    authController.js
    userController.js
    taskController.js
  middleware/
    authMiddleware.js      ← protect, authorizeRoles, authorizePermission
    errorMiddleware.js
  models/
    User.js
    task.js
  routes/
    authRoutes.js
    userRoutes.js
    taskRoutes.js
  utils/
    generateToken.js
    asyncHandler.js
  server.js
```

## Testing flow (Thunder Client / Postman)

1. `POST /api/auth/register` → copy `token`
2. `GET /api/auth/me` with Bearer token
3. Manually set first admin in MongoDB, or register then update role in DB
4. Admin: `POST /api/users` to create employees
5. `POST /api/tasks` with token → task linked to user
6. Employee tries admin route → expect `403`
