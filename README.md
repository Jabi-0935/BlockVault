# BlockVault - Cryptocurrency Portfolio Management Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue)](https://blockvault-yks2.onrender.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19+-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)](https://mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Beta-orange)](https://github.com/Jabi-0935/BlockVault)

BlockVault is a cryptocurrency portfolio management platform currently in **Beta** that enables users to track, analyze, and manage their crypto investments with real-time data and interactive visualizations.

## 🌟 Features

### Core Functionality
- **🔐 Secure Authentication**: JWT-based user authentication with bcrypt password hashing
- **📊 Real-time Portfolio Analytics**: Live cryptocurrency prices via CoinMarketCap API
- **💰 Asset Management**: Add, update, and delete cryptocurrency holdings with transaction tracking
- **📈 Performance Tracking**: Profit/loss calculations with percentage returns and average cost basis
- **📱 Responsive Design**: Mobile-first design with Tailwind CSS and adaptive layouts
- **🎯 Transaction History**: Detailed transaction management for each cryptocurrency

### Advanced Features  
- **📊 Interactive Charts**: Powered by Highcharts with dual display modes
  - Portfolio allocation pie charts
  - Performance bar charts with profit/loss visualization
  - Mobile overlay and desktop side-by-side layouts
- **⚡ Smart Caching**: TTL-based caching (10 seconds for prices, 24 hours for crypto list)
- **🎨 Modern UI**: Professional dark theme with skeleton loading states
- **🔍 Smart Search**: Debounced cryptocurrency search with autocomplete
- **📱 Mobile Responsive**: Optimized mobile experience with collapsible charts

## 🏗️ Architecture

### Tech Stack

**Frontend (Client)**
- **Framework**: React 19 with Vite build tool
- **Styling**: Tailwind CSS 4.1 with custom dark theme
- **Charts**: Highcharts React for interactive data visualization
- **Routing**: React Router DOM v7 with protected routes
- **Forms**: React Hook Form for optimized form handling
- **Icons**: FontAwesome + React Icons
- **State Management**: React Context API (AuthContext + DashContext)

**Backend (Server)**
- **Runtime**: Node.js 18+ with Express 5
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) with bcryptjs
- **External APIs**: CoinMarketCap Pro API (5000 cryptocurrencies limit)
- **Caching**: In-memory TTL-based caching system
- **Architecture**: RESTful API with MVC pattern

### Project Structure

```
BlockVault/
├── Client/                          # React Frontend Application
│   ├── src/
│   │   ├── components/             # Reusable UI Components
│   │   │   ├── Auth/              # Authentication components
│   │   │   │   ├── InputField.jsx # Reusable form input component
│   │   │   │   └── Toogle.jsx     # Login/Signup toggle
│   │   │   ├── Assets.jsx         # Portfolio assets table
│   │   │   ├── BarChart.jsx       # Performance visualization
│   │   │   ├── Card.jsx           # Metric display cards
│   │   │   ├── Confirm.jsx        # Confirmation modal
│   │   │   ├── Footer.jsx         # Application footer
│   │   │   ├── Hero.jsx           # Homepage hero component
│   │   │   ├── NavBar.jsx         # Navigation header
│   │   │   ├── New_Asset.jsx      # Asset addition/editing form
│   │   │   ├── PieChart.jsx       # Portfolio allocation chart
│   │   │   └── ProtectedRoute.jsx # Route protection wrapper
│   │   ├── context/               # State Management
│   │   │   ├── AuthContext.jsx    # Authentication state
│   │   │   └── DashContext.jsx    # Dashboard data state
│   │   ├── pages/                 # Application Pages
│   │   │   ├── Auth.jsx           # Login/Registration page
│   │   │   ├── Dashboard.jsx      # Main portfolio dashboard
│   │   │   ├── Home.jsx           # Homepage (currently displays Hero)
│   │   │   └── Transactions.jsx   # Transaction history page
│   │   ├── assets/                # Static assets (Logo, images)
│   │   ├── App.jsx                # Main application component
│   │   └── main.jsx               # Application entry point
│   └── package.json
├── Server/                         # Node.js Backend API
│   ├── src/
│   │   ├── config/                # Configuration modules
│   │   │   ├── db.js              # MongoDB connection
│   │   │   └── jwt.js             # JWT utilities
│   │   ├── controllers/           # Business Logic Controllers
│   │   │   ├── analyticsController.js    # Portfolio analytics
│   │   │   ├── authController.js         # Authentication logic
│   │   │   └── portfolioController.js    # Portfolio CRUD operations
│   │   ├── middleware/            # Express Middleware
│   │   │   ├── apicheck.js        # API key validation
│   │   │   └── authMiddleware.js  # JWT authentication middleware
│   │   ├── model/                 # Database Schemas
│   │   │   ├── Asset.js           # Transaction/Asset schema
│   │   │   └── User.js            # User schema
│   │   ├── routes/                # API Route Definitions
│   │   │   ├── analyticsRoutes.js # Analytics endpoints
│   │   │   ├── authRoutes.js      # Authentication endpoints
│   │   │   └── portfolioRoutes.js # Portfolio management endpoints
│   │   ├── services/              # External Services
│   │   │   └── cryptoService.js   # CoinMarketCap API integration
│   │   ├── app.js                 # Express application setup
│   │   └── server.js              # Server entry point
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)
- **CoinMarketCap API Key** ([Get free API key](https://coinmarketcap.com/api/))

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Jabi-0935/BlockVault.git
   cd BlockVault
   ```

2. **Backend Setup**
   ```bash
   cd Server
   npm install
   ```

   Create `.env` file in the Server directory:
   ```env
   # Database Configuration
   MONGO_URI=mongodb://localhost:27017/blockvault
   # or for MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blockvault

   # Authentication
   JWT_SECRET=your_secure_jwt_secret_key

   # API Configuration
   API_KEY=your_internal_api_key
   CMC_PRO_API_KEY=your_coinmarketcap_api_key

   # Server Configuration
   PORT=5000
   ```

3. **Frontend Setup**
   ```bash
   cd ../Client
   npm install
   ```

   Create `.env` file in the Client directory:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_C_LOGO=your_crypto_logo_api_token
   ```

4. **Start Development Servers**

   **Backend** (Terminal 1):
   ```bash
   cd Server
   npm run dev  # Uses nodemon for auto-restart
   ```

   **Frontend** (Terminal 2):
   ```bash
   cd Client
   npm run dev  # Vite development server
   ```

5. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 📋 API Documentation

### Authentication Endpoints
```
POST /signup      # User registration
POST /login       # User authentication  
GET  /profile     # Get user profile (protected)
```

### Portfolio Management
```
POST   /portfolio         # Add new cryptocurrency transaction
GET    /portfolio         # Get user's portfolio summary
PUT    /portfolio/:id     # Update specific transaction
DELETE /portfolio/:id     # Delete specific transaction
GET    /transaction/:id   # Get transactions for specific cryptocurrency
```

### Analytics & Data
```
GET /analytics    # Get comprehensive portfolio metrics
GET /cryptos      # Get available cryptocurrencies list (5000 cryptos)
```

### Response Examples

**Portfolio Analytics Response:**
```json
{
  "gainer": { "name": "BTC", "pnl": 1250.50 },
  "loser": { "name": "ETH", "pnl": -340.20 },
  "balance": 15750.75,
  "pnl": 910.30,
  "per_asset": [
    {
      "cryptoName": "BTC",
      "totalAmt": 0.5,
      "avgBuyPrice": 45000,
      "currPrice": 47500,
      "returns": 1250.00,
      "per_return": 5.56,
      "holding": 23750.00
    }
  ]
}
```

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication with 1-day expiration
- **Password Hashing**: bcrypt with salt rounds for password security
- **API Key Protection**: Internal API key validation for authentication endpoints
- **Input Validation**: React Hook Form validation with error handling
- **CORS Configuration**: Controlled cross-origin resource sharing
- **Protected Routes**: Frontend route protection with authentication middleware

## 🔧 Configuration

### Database Schema

**User Model:**
```javascript
{
  name: String (required),
  email: String (unique, required),
  passhash: String (required),
  createdAt: Date (default: Date.now)
}
```

**Asset Model:**
```javascript
{
  userid: ObjectId (ref: User),
  cryptoname: String (required),
  buyprice: Number (required),
  amt: Number (required),
  date: Date (default: Date.now)
}
```

## 📊 Performance Features

- **Smart Caching System**:
  - Cryptocurrency prices: 10-second TTL
  - Cryptocurrency list: 24-hour TTL
- **MongoDB Aggregation**: Optimized portfolio calculations with aggregation pipelines
- **Responsive Loading**: Skeleton loading states for better UX
- **Debounced Search**: Optimized cryptocurrency search with autocomplete
- **Component Optimization**: React Context for efficient state management

## 🚀 Deployment

The application is deployed on **Render** for both frontend and backend.

### Production Build

**Frontend:**
```bash
cd Client
npm run build
```

**Backend:**
```bash
cd Server
npm start
```

**Live Application**: [https://blockvault-yks2.onrender.com/](https://blockvault-yks2.onrender.com/)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**
2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit Changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open Pull Request**

### Development Guidelines

- Follow ESLint configuration for code consistency
- Write descriptive commit messages
- Test thoroughly before submitting PRs
- Update documentation for new features

## 🚧 Current Status & Roadmap

### Beta Version Status
BlockVault is currently in **Beta** with core functionality complete and stable.

### Known Limitations
- CoinMarketCap API rate limits on free tier
- Limited to top 5000 cryptocurrencies
- No real-time WebSocket price updates

### Planned Features
- [ ] **Guest Authentication**: Allow users to explore without registration
- [ ] **Real-time Price Alerts**: Notification system for price targets
- [ ] **Advanced Analytics**: More detailed performance metrics
- [ ] **Export Functionality**: PDF/CSV export for portfolios
- [ ] **Mobile App**: Native mobile application
- [ ] **Portfolio Sharing**: Share portfolio performance

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [CoinMarketCap](https://coinmarketcap.com/) for cryptocurrency data API
- [Highcharts](https://www.highcharts.com/) for interactive visualization components
- [Tailwind CSS](https://tailwindcss.com/) for the responsive design system
- [Render](https://render.com/) for hosting and deployment

## 📞 Support & Links

- **Live Demo**: [https://blockvault-yks2.onrender.com/](https://blockvault-yks2.onrender.com/)
- **GitHub Repository**: [https://github.com/Jabi-0935/BlockVault](https://github.com/Jabi-0935/BlockVault)
- **Issues**: [Report bugs or request features](https://github.com/Jabi-0935/BlockVault/issues)

---

<div align="center">
  <p>Made with pressure by <a href="https://github.com/Jabi-0935">Jabi-0935</a></p>
  <p>⭐ Star this repository if you find it helpful!</p>
</div>
