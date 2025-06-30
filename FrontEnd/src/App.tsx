import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { DatePicker } from 'antd';
import HeaderMain from './components/HeaderComponent/HeaderMain/header.tsx';
import HeaderMNG from './components/HeaderComponent/HeaderManagement/headerManagement.tsx';
import Footer from '../src/components/FooterComponent/footer.tsx';
import Navbar from './pages/ManagementPage/Navbar/navbar.tsx';
import './Global.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HeaderMain></HeaderMain>
      <Navbar></Navbar>
      <Footer></Footer>
    </>
  )
}

export default App
