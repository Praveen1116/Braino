# Braino

## Live Link: https://braino-gamma.vercel.app/

Welcome to **Braino** – a modern, full-stack application designed to deliver seamless user experiences with a robust backend and a dynamic frontend. This monorepo contains both the backend (Node.js/TypeScript) and frontend (React/TypeScript) projects.

---

## 🧑‍💻 What Users Can Do

- **Sign Up & Sign In:** Create a new account or log in securely.
- **Manage Content:** Create, view, update, and delete your own content.
- **Share Content:** Share your content with others via unique links.
- **Organize Information:** Use intuitive UI components to organize and access your data.
- **Enjoy Fast Performance:** Experience quick responses and smooth navigation thanks to a modern tech stack.
- **Access Anywhere:** Use the app from any device with a web browser.

*Note: Actual features may depend on your implementation. Update this list as your app grows!*

## Highlight of dashboard
<img width="1900" height="911" alt="image" src="https://github.com/user-attachments/assets/06a5d515-beed-41da-a2f8-8ee866dc96b9" />


---

## Repository Structure

```
Braino/
│
├── braino/        # Backend (Node.js, TypeScript)
└── braino-fe/     # Frontend (React, TypeScript, Vite)
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

---

## 🛠️ Backend – braino

A scalable Node.js backend built with TypeScript.

### Features

- 🔒 JWT-based authentication
- 🗄️ Database integration (configure in `src/db.ts`)
- 🧩 Modular architecture
- 🛡️ Middleware for user management

### Setup & Run

```bash
cd braino
npm install

# Start the server
npm run dev
```

### Configuration

- Edit `src/config.ts` for environment variables and settings.
- Database settings in `src/db.ts`.

### Scripts

- `npm run dev` – Start in development mode
- `npm run build` – Build for production
- `npm start` – Start in production

### Folder Structure

```
braino/
├── src/
│   ├── config.ts
│   ├── db.ts
│   ├── index.ts
│   ├── userMiddleware.ts
│   └── utils.ts
├── package.json
└── tsconfig.json
```

---

## 🎨 Frontend – braino-fe

A fast, modern frontend built with React, TypeScript, and Vite.

### Features

- 🔒 Secure authentication with JWT and bcrypt
- 🗄️ MongoDB integration via Mongoose
- ⚡ Fast, modular Express.js API
- 🛡️ CORS support for safe cross-origin requests
- 🧩 TypeScript for type safety and maintainability
- 🧪 Input validation using Zod
- 🏗️ Build scripts for TypeScript compilation and production-ready deployment
- 🚀 Simple development workflow (`npm run dev` builds and starts the server)

### Setup & Run

```bash
cd braino-fe
npm install

# Start the development server
npm run dev
```

### Scripts

- `npm run dev` – Start in development mode
- `npm run build` – Build for production

### Folder Structure

```
braino-fe/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── icons/
│   ├── pages/
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
└── vite.config.ts
```

---

## 📦 Monorepo Management

- Both projects are managed independently.
- Use separate terminals for backend and frontend development.
- Shared documentation and issues are tracked in this monorepo.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙋‍♂️ Contact

For questions, suggestions, or support, please open an issue or contact me `https://x.com/Praveen18611166`.

---
