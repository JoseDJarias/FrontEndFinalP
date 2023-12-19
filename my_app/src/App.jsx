import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRouter from './components/router/AppRouter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <AppRouter/>
      </div>
    </>
  )
}

export default App
