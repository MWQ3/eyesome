import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import Products from './pages/Products';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Product from './pages/Product';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import Loading from './components/Loading';

function App() {
  const [isloading, setIsLoading] = useState(true)

  useEffect(() => {
    const artificialLoadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(artificialLoadingTimer)
  }, [])

  if(isloading) {
    return <Loading />
  }

  return (
    <>
      <Header />
    
        <div className='main-container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<SignIn /> } />
            <Route path='/signup' element={<SignUp />} />

            <Route path='/profile' element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
            } />

            <Route path='/products' element={<Products />} />
            <Route path='/product/:productId' element={<Product />} />

            <Route path='/wishlist' element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
            } />

            <Route path='/cart' element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
            } />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
   
      <ToastContainer limit={4} />
    </>
  );
}

export default App;
