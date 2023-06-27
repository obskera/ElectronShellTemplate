import React, { useState } from 'react'
import './Budget.css'
const electron = (window as any).electron
// import { ipcRenderer } from 'electron'
// const {ipcRenderer} = (window as any).require('electron')

const Budget = () => {

  electron.onUpdateCounter((_event, value) => {
    // const oldValue = Number(counter.innerText)
    // const newValue = oldValue + value
    // counter.innerText = newValue
    setWindowSize(value)
    console.log(value)
  })
  // ipcRenderer.on("resized", resizeListener)
  // electron.ipcRenderer.invoke("resized", resizeListener)
  // ipcRenderer.invoke("resized", () => {})
  const [windowSize, setWindowSize] = useState(electron.getWindowSettings())

  

  // remote.on('resized', (param1, param2) => {
   
  // });
   

  return (
    <>
        <div className = "test container flex-container" style={{height: (windowSize[1] - 150), width: (windowSize[0] - 150)}}>
        {/* <div className = "test container"> */}
            <h1 className="mainHeader">Budget</h1>
            <section className='test section2'>
                <section className="block test"></section>
                <section className="block test"></section>
            </section>
        </div>
        
    </>

  )
}

export default Budget