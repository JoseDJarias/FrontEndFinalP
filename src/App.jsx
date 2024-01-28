import './App.css'
import { CartProvider } from './components/context/CartProductsContext';
import AppRouter from './components/router/AppRouter'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  return (
    <>
      <div className="App">
        <CartProvider>
        <AppRouter/>
        </CartProvider>
      </div>
    </>
  )
}

export default App
