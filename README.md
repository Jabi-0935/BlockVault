

# BlockVault

[Live Demo](https://blockvault-yks2.onrender.com/)

BlockVault is a full-stack cryptocurrency portfolio management application. It enables users to securely track, analyze, and manage their crypto assets with real-time analytics and a modern, responsive UI.

---

## Project Overview

BlockVault consists of a React frontend (Client) and a Node.js/Express backend (Server) with MongoDB for data storage. The app provides user authentication, portfolio management, analytics, and a modern UI.

Still Under Development. Soon will be available on production level!!.

---

## Features

- **User Authentication**: Secure login/signup, JWT-based, protected routes.
- **Portfolio Management**: Add, view, and manage crypto assets.
- **Analytics**: Real-time portfolio analytics (charts planned).
- **Transaction Tracking**: (Planned/partially implemented).
- **Modern UI**: Responsive, component-based, Tailwind CSS.

---

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Highcharts, React Router, React Hook Form, Boxicons, React Icons
- **Backend**: Node.js (Express 5), Mongoose 8, MongoDB, JWT, bcryptjs, dotenv, cors

---

## Project Structure

```
BlockVault/
├── Client/
│   ├── src/
│   │   ├── components/      # UI components (NavBar, Hero, Card, PieChart, etc.)
│   │   ├── context/         # AuthContext for authentication state
│   │   ├── layouts/         # (Planned for layout components)
│   │   ├── pages/           # App pages (Home, Dashboard, Auth)
│   │   └── assets/          # Static assets (Logo, etc.)
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── Server/
│   ├── src/
│   │   ├── controllers/     # API controllers (auth, analytics, portfolio)
│   │   ├── middleware/      # Middleware (auth, API checks)
│   │   ├── model/           # Mongoose models (User, Asset)
│   │   ├── routes/          # API route definitions
│   │   ├── services/        # Business logic (priceService)
│   │   └── config/          # DB and JWT config
│   ├── package.json
│   └── jsconfig.json
```

---

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/Jabi-0935/BlockVault_Server.git
   cd BlockVault_Server
   ```

2. **Install dependencies**
   - Client:
     ```sh
     cd Client
     npm install
     ```
   - Server:
     ```sh
     cd ../Server
     npm install
     ```

3. **Configure Environment Variables**
   - Create a `.env` file in `Server/` with:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

4. **Run the Application**
   - Start backend:
     ```sh
     cd Server
     npm start
     ```
   - Start frontend:
     ```sh
     cd ../Client
     npm run dev
     ```

---

## Folder Details

- **Client/src/components**: UI components (NavBar, Hero, Card, PieChart, etc.)
- **Client/src/context**: React context for authentication
- **Client/src/pages**: Main app pages (Home, Dashboard, Auth)
- **Server/src/controllers**: API logic for auth, analytics, portfolio
- **Server/src/routes**: API endpoints
- **Server/src/model**: Data models (User, Asset)
- **Server/src/services**: Business logic (e.g., price fetching)

---

## Contribution

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push and open a Pull Request

---

## License

MIT License

---

## Author

- [Jabi-0935](https://github.com/Jabi-0935)
