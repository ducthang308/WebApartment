import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { DatePicker } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../src/components/HeaderComponent/header.tsx';
import Footer from '../src/components/FooterComponent/footer.tsx';
import Navbar from '../src/components/Navbar/navbar.tsx';
import LoginPage from './pages/Login/LoginPage.tsx';
import History from './pages/HistoryPay/history.tsx';
import Home from './pages/Home/Home.tsx';
import TopUpPage from './pages/TopUpPages/TopUpPage.tsx';
import AccountManagement from './pages/AccountManagements/AccountManagement.tsx'; 
import './Global.css'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/history" element={<History />} />
        <Route path="/recharge/:method" element={<TopUpPage />} />
        <Route path="/AccountManagement" element={<AccountManagement />} />
      </Routes>
    </Router>
  );
}

export default App
