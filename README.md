# Stock Exchange Simulation App

A dynamic stock market simulation web application built using React, allowing users to buy and sell shares, track their portfolio, and view transaction history in a real-time interactive environment.

---

## Live Demo
https://stock-exchange-app-zeta.vercel.app/
---

## Why This Project?

This project was built to simulate real-world trading interactions and improve my understanding of building dynamic, state-driven applications using React.

## Tech Stack
- React (Frontend)
- JavaScript (ES6+)
- CSS (Responsive UI)
- React Hooks (useState, useEffect)
- React Router (for navigation)

---

## Features

- Real-time stock price simulation
- Buy and sell shares
- Portfolio tracking
- Transaction history with delete functionality
- Dynamic UI updates using React state
- Responsive design (desktop + mobile)

---

## How It Works

- Stock prices fluctuate dynamically using logic-based simulation
- Users can execute trades based on available balance
- Portfolio updates instantly based on transactions
- Transaction history records all trades with details
- State is managed using React hooks for efficient rendering

---

## Project Structure 
```
stock-exchange-app/
├── public/
│ └── images/
│ ├── stock.svg
│ ├── wallet.svg
│ └── (company logos...)
├── src/
│ ├── Components/
│ │ ├── Buy.jsx
│ │ ├── Card.jsx
│ │ ├── History.jsx
│ │ ├── Home.jsx
│ │ ├── Portfolio.jsx
│ │ ├── Sell.jsx
│ │ ├── Timer.jsx
│ │ └── Transaction.jsx
│ ├── assets/
│ │ └── Data.jsx
│ ├── App.css
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```
---
## Installation & Setup

1. Clone the repository:
git clone https://github.com/Shankarc98/stock-exchange-app

2. cd stock-exchange-app

3. npm install

4. npm start

Author: Shankar Narayan 

## Screenshots 
<img width="1901" height="871" alt="image" src="https://github.com/user-attachments/assets/c85ca240-6f7d-4579-ab15-7328e8a92e8d" />

## Key Learnings

- Improved understanding of React state management using hooks
- Learned how to structure components for scalability
- Implemented dynamic UI updates based on user actions
- Gained experience handling user interactions and edge cases

## Challenges Faced

- Managing state consistency across multiple components
- Handling dynamic updates for stock prices without performance issues
- Ensuring responsive design for smaller screens
