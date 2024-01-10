import './App.css'
import AppRouter from './components/router/AppRouter'
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './components/context/UserContext'



function App() {

  return (
    <>
      <div className="App">
        <UserProvider>
        <AppRouter/>
        </UserProvider>
      </div>
    </>
  )
}

export default App
