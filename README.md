<p align="center"><img src="https://i.imgur.com/Efleeiz_d.webp?maxwidth=760&fidelity=grand"></p>

# tauri-react-redis-template  

Built to help developers quickly set up a modern Tauri app with Rust, React, Redis, and ShadCN/UI.  

## ✅ Features  
This template includes:  

- 🔹 **[Rust](https://www.rust-lang.org/)** – Backend logic with strong performance  
- 🔹 **[Tauri](https://tauri.app/)** – Lightweight desktop app framework  
- 🔹 **[React](https://react.dev/)** – Modern frontend UI  
- 🔹 **[Redis](https://redis.io/)** – Caching for improved performance  
- 🔹 **[ShadCN/UI](https://ui.shadcn.com/)** – Beautiful prebuilt UI components  
- 🔹 **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework  

## 👨‍💻 Created by Jeki Gates  
If this template helps you, consider leaving a ⭐ to support!  

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) (optional, for Redis)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Rust](https://www.rust-lang.org/tools/install) (required for Tauri)

## Setup Instructions

### 1. Set up Redis

**Option A: Using Docker (Recommended)**

```bash
docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest
```

**Option B: Using WSL (Windows only)**

If you prefer not to use Docker, you can install Redis on Windows using WSL. Follow the tutorial at the [official Redis documentation](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-windows/).

### 2. Set up PostgreSQL

1. Install [PostgreSQL Desktop](https://www.postgresql.org/download/)
2. Create an account with a username and password (or use the root account)
3. Create a new database for your project

### 3. Clone and Configure the Project

1. Clone the repository or download and extract the ZIP file:

```bash
git clone https://github.com/yourusername/tauri-react-redis-template.git
cd tauri-react-redis-template
```

2. Copy the example environment file:

```bash
cp .env.example .env
```

3. Configure your `.env` file with your database and Redis connection strings:

```
DATABASE_URL=postgres://username:password@localhost/database_name
REDIS_URL=redis://127.0.0.1:6379
```

Example (using root postgres account with password 'rootpass' and database 'VorteKia'):

```
DATABASE_URL=postgres://postgres:rootpass@localhost/VorteKia
REDIS_URL=redis://127.0.0.1:6379
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Application

```bash
npm run tauri dev
```

> ⚠️ **Important**: Always use `npm run tauri dev` to start the application. Using `npm run dev` will cause errors when connecting the Tauri frontend to the Rust backend.

## Development Notes

- Ensure that Docker is running the Redis container before starting the application
- Verify that PostgreSQL service is active and the database is accessible
- Any changes to the environment variables require restarting the application
