# Fraud Review Detection AI Demo

This project is an MVP for the Fraud Review Detection AI, featuring a complete AI model and demonstration software.

## Core Deliverables

1. Fraud Review Detection AI
2. Full-Stack Web Application

## Local Setup and Demonstration

### Prerequisites
- Node.js
- PNPM

---

Run the following command:

### Package Installation

---

1. Run install command at the root of this project
```sh
pnpm install
```

### Initialize the Database

---

1. Spin up the required database container

```sh
docker compose up -d
```

2. Configure `.env` in `packages/db` according to `.env.example`

3. Migrate, build, and seed the database

```sh
cd packages/db
pnpm db:migrate
pnpm build
pnpm db:seed
```

### Configure API environment

---

1. Configure `.env` in `apps/api` according to `.env.example`

### Configure Web environment

---

1. Configure `.env` in `apps/web` according to `.env.example`

### Run the Application

---

1. Run start command at the root of this project

```sh
pnpm dev
```