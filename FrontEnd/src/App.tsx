import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { DatePicker } from 'antd';
import Header from '../src/components/HeaderComponent/header.tsx';
import Footer from '../src/components/FooterComponent/footer.tsx';
import './Global.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header></Header>
      <Footer></Footer>
    </>
  )
}

export default App
