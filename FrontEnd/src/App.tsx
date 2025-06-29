import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { DatePicker } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../src/components/HeaderComponent/header.tsx';
import Footer from '../src/components/FooterComponent/footer.tsx';
import LoginPage from './pages/Login/LoginPage.tsx';
import Home from './pages/Home/Home.tsx';
import './Global.css'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App
