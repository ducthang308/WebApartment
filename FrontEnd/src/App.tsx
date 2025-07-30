import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { DatePicker } from 'antd';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../src/components/HeaderComponent/header.tsx';
import Footer from '../src/components/FooterComponent/footer.tsx';
import Navbar from '../src/components/Navbar/navbar.tsx';
import LoginPage from './pages/Login/LoginPage.tsx';
import History from './pages/HistoryPay/history.tsx';
import Home from './pages/Home/Home.tsx';
import TopUpPage from './pages/TopUpPages/TopUpPage.tsx';
import AccountManagement from './pages/AccountManagements/AccountManagement.tsx'; 
=======
import HeaderMain from './components/HeaderComponent/HeaderMain/header.tsx';
import Footer from '../src/components/FooterComponent/footer.tsx';
import Navbar from './pages/ManagementPage/Navbar/navbar.tsx';
import Management from "./pages/ManagementPage/managementPage.tsx"
import ServicePrice from './components/ServicePriceComponent/servicePrice.tsx';
>>>>>>> 35c5437f2a181b6e079343fb042491681019ac5b
import './Global.css'

function App() {
  return (
<<<<<<< HEAD
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
=======
    <>
      <HeaderMain></HeaderMain>
      <ServicePrice></ServicePrice>
      <Footer></Footer>
    </>
  )
>>>>>>> 35c5437f2a181b6e079343fb042491681019ac5b
}

export default App
