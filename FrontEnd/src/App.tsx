import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { DatePicker } from 'antd';
import HeaderMain from './components/HeaderComponent/HeaderMain/header.tsx';
import Footer from '../src/components/FooterComponent/footer.tsx';
import Navbar from './pages/ManagementPage/Navbar/navbar.tsx';
import Management from "./pages/ManagementPage/managementPage.tsx"
import './Global.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HeaderMain></HeaderMain>
      <Management></Management>
      <Footer></Footer>
    </>
  )
}

export default App
