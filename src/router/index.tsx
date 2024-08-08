import { Route, Routes } from 'react-router-dom'
import Home from '../page/home'
import NotFound from '../page/notFound'
import ProfileUser from '../page/ProfileUser'
import Carts from '../page/cart'
import Heart from '../page/heart'
import ProtectedRouter from '../page/AdminPage/protectedRouter'
import Product from '../page/product'
import FormContact from '../page/fromContact'
import ProductDetails from '../page/productDetail'
import Products from '../page/AdminPage/Products'
import DashBoard from '../page/AdminPage/DashBoard'
import Category from '../page/AdminPage/category'
import UserAccount from '../page/AdminPage/userAccount'
// import Admin from '../page/AdminPage/admin'
import Login from '../page/login'
import Register from '../page/register'




const Router = () => {
  return (
    <Routes>
      {/*Đường dẫn user*/}
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register/>} />
      <Route path='/profile' element={<ProfileUser />} />
      <Route path='/cart' element={<Carts />} />
      <Route path='/heart' element={<Heart />} />
      <Route path='/product' element={<Product />} />
      <Route path='/productdetail' element={<ProductDetails />} />
      <Route path='/formContact' element={<FormContact />} />


      {/* Đường dẫn admin*/}
      <Route path='/admin' element={<ProtectedRouter/>}>
        <Route index element={<DashBoard />} />
        <Route path='product' element={<Products />} />
        <Route path='category' element={<Category />} />
        <Route path='useraccount' element={<UserAccount />} />
      </Route>

      {/*Đường dẫn lỗi*/}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Router
