import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRouter from './components/router/AppRouter'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  return (
    <>
      <div className="App">
        <AppRouter/>
      </div>
    </>
  )
}

export default App
