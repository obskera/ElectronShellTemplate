import { useState } from "react"
const electron = (window as any).electron

const Test = () => {
  
  const [count, setCount] = useState(electron.getCount)

  const increment = _ => {
    let newCount = count + 1
    setCount(newCount)
    electron.setCount(newCount)
  }
  const decrement = _ => {
    let newCount = count - 1
    setCount(newCount)
    electron.setCount(newCount)
  }
  return (
    <>
        <div> The Test Count is: {electron.getCount()} </div>
        <button onClick={increment}>MOAR</button>
        <button onClick={decrement}>LESS</button>

    </>

  )
}

export default Test