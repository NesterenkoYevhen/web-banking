# 🌊 Wave Electronic Banking

A full-stack **web banking system** built as part of a bachelor’s thesis project.  
This application demonstrates modern **frontend and backend development** using **JavaScript**, **TypeScript**, and a **microservice architecture** to deliver a secure, scalable, and interactive pseudo-banking experience.

---

## 📘 Overview

**Wave Electronic Bank** is a simulated online banking platform that allows users to:
- Create and manage accounts.
- Deposit and transfer pseudo-money between users.
- View transaction history and manage virtual credit cards.
- Check real-time currency conversion rates and weather data.
- Use an administrator dashboard for monitoring and approval operations.

The project consists of two major parts:

- **Frontend:** a React-based client application.
- **Backend:** a microservice ecosystem built with Node.js, Express, and NestJS, communicating through NATS and running inside Docker containers orchestrated via Kubernetes.

---

## 🏗️ Architecture

### ⚙️ Backend — Microservices (Node.js + TypeScript)

Each service is isolated, communicating asynchronously via **NATS Streaming**.  
Containerized using **Docker** and orchestrated with **Kubernetes**, allowing scalable deployment and service independence.

#### Implemented Microservices
- **Auth Service** — handles registration, login, JWT authentication, and cookie-based sessions.
- **Cards Service** — manages user cards, card limits, and linking to user accounts.
- **Top-Up Service** — processes card refill requests with admin approval.
- **Transfer Service** — handles peer-to-peer money transfers.
- **Transactions Service** — stores and provides transaction history.
- **Admin Service** — provides administrative features for monitoring and verification.
- **Common Module (`@ynbanking/common`)** — shared NPM package containing reusable logic, middlewares, and event definitions.

#### Key Technologies
- Node.js, TypeScript, Express
- MongoDB / PostgreSQL
- NATS for message streaming
- Docker, Kubernetes, Skaffold, Ingress
- cookie-session, jsonwebtoken, express-validator
- mongoose, mongoose-update-if-current
- nodemailer for email notifications

---

### 💻 Frontend — React Banking Dashboard

Developed with **React + TypeScript + Redux Toolkit**, the client provides a responsive interface for all banking features.

#### Core Features
- User authentication and protected routes.
- Real-time account and balance management.
- Card creation, refill, and money transfer forms.
- Transaction history visualization.
- Admin panel for request approval.
- Currency exchange (via Fixer.io) and weather display (via OpenWeather API).
- Responsive adaptive UI designed in Figma.

#### Key Technologies
- React 18, TypeScript
- Redux Toolkit, React Redux
- React Router DOM
- Axios for API requests
- Sass for styling
- classnames, react-icons
- Responsive design with reusable components and hooks

---

## 📂 Project Structure

```
wave-banking/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── redux/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── utils/
│   │   └── index.tsx
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
├── backend/
│   ├── auth/
│   ├── cards/
│   ├── transfers/
│   ├── topup/
│   ├── transactions/
│   ├── admin/
│   ├── common/ (@ynbanking/common)
│   ├── kubernetes/ (deployment & ingress configs)
│   └── package.json
│
├── docker-compose.yaml
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- Docker & Kubernetes (e.g. Minikube or Docker Desktop)
- NPM or Yarn

### Setup

#### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/web-banking.git
cd web-banking
```

#### 2. Run all backend services
Each service runs independently:
```bash
cd backend/auth && npm install && npm start
cd ../cards && npm install && npm start
...
```

Or use Docker:
```bash
docker-compose up --build
```

#### 3. Start frontend
```bash
cd frontend
npm install
npm start
```

#### 4. Access the app
Open http://localhost:3000

---

## 🧠 Technical Highlights

- Microservice Communication: Event-driven messaging via NATS.
- Scalable Infrastructure: Deployed with Docker containers orchestrated by Kubernetes.
- Security: JWT authentication, cookie sessions, data validation, and role-based access.
- Data Management: MongoDB for dynamic data and PostgreSQL for relational data.
- CI/CD Development Flow: Automated builds using Skaffold for rapid iteration.

---

## 🧩 External APIs

| API | Purpose |
|-----|----------|
| Fixer.io | Real-time currency conversion |
| OpenWeather | Live weather data by region |

---

## 🧪 Testing

- Backend endpoints tested via Postman and Jest.
- Frontend unit testing with React Testing Library.
- Integration tests for key user flows (authentication, transfers, history).

---

## 📊 Future Improvements

- Implement 2FA and advanced user roles.
- Add real payment gateway (Stripe / PayPal integration).
- Introduce WebSocket-based live updates.
- Extend admin dashboard analytics.
- Move to CI/CD pipeline (GitHub Actions + Kubernetes Deploy).

---

## 👨‍💻 Author

**Yevhen Nesterenko**  
Bachelor of Computer Science, Lviv National University  
GitHub: https://github.com/nesterenkoyevhen  
Technologies: JavaScript, TypeScript, Node.js, React, Docker, Kubernetes  
Year: 2023  

---

## 📚 References

Developed as part of the bachelor’s qualification work:  
> “Research of the efficiency of programming technologies using JavaScript and microservice architecture for frontend and backend fullstack web development” — LNU, Faculty of Electronics and Computer Technologies, Department of System Design, 2023.
