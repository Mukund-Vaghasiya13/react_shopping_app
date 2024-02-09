import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider ,createRoutesFromElements,Route} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Sinup from './Pages/Sinup.jsx'
import { Provider } from 'react-redux'
import { store } from './Redux/store.js'
import Product from './Pages/Product.jsx'
import ProductCart from './Pages/Cart.jsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
    <Route path='' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/sinup' element={<Sinup/>}/>
    <Route path='/product/:id' element={<Product/>}/>
    <Route path='/cart' element={<ProductCart/>}/>
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Provider store={store}>
    <RouterProvider router={router}>
      <App/>
    </RouterProvider>
   </Provider>
  </React.StrictMode>,
)
