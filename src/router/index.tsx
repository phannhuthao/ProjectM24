import { Route, Routes } from 'react-router-dom'
import Home from '../page/UserPage/home'
import NotFound from '../page/UserPage/notFound'
import ProfileUser from '../page/UserPage/ProfileUser'
import Carts from '../page/UserPage/cart'
import Heart from '../page/UserPage/wishlist'
import ProtectedRouter from '../page/AdminPage/protectedRouter'
import Product from '../page/UserPage/product'
import FormContact from '../page/UserPage/fromContact'
import ProductDetails from '../page/UserPage/productDetail'
import Products from '../page/AdminPage/Products'
import DashBoard from '../page/AdminPage/DashBoard'
import UserAccount from '../page/AdminPage/userAccount'
import Login from '../page/login'
import Register from '../page/register'
import CategoryManager from '../page/AdminPage/CategoryManager'
import ProductDetail from '../page/UserPage/productDetail'
import Buy from '../page/UserPage/Buy'




const Router = () => {
  return (
    <Routes>
      
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register/>} />
      <Route path='/profile' element={<ProfileUser />} />
      <Route path='/cart' element={<Carts />} />
      <Route path='/heart' element={<Heart />} />
      <Route path='/product' element={<Product />} />
      <Route path="/productdetail/:id" element={<ProductDetail />} />
      <Route path='/formContact' element={<FormContact />} />
      <Route path='/buy' element={<Buy/>}></Route>

      {/*Đường dẫn user*/}
      {/* <Route path='/home' element={<Home />}>
      <Route index element={<Product/>} />
      <Route path='productdetail' element={<ProductDetails />} />
      <Route path='formContact' element={<FormContact />} />
      <Route path='profile' element={<ProfileUser />} />
      <Route path='cart' element={<Carts />} />
      <Route path='heart' element={<Heart />} />
      </Route> */}

      {/*Đường dẫn đăng nhập , đăng kí*/}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register/>} />
      
      {/* Đường dẫn admin*/}
      <Route path='/admin' element={<ProtectedRouter/>}>
        <Route path="category" element={<CategoryManager/>}/>
        <Route index element={<DashBoard />}/>
        <Route path='product' element={<Products />} />
        <Route path='useraccount' element={<UserAccount />}/>
      </Route>

      {/*Đường dẫn lỗi*/}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Router
