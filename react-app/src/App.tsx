import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Test from "../src/components/Test/Test.tsx"
import Budget from "../src/components/Budget/Budget.tsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Test /> */}
      <Budget />
    </>
  )
}

export default App
