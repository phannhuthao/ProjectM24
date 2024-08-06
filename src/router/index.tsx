import { Route, Routes } from 'react-router-dom'
import Login from '../page/login'
import Register from '../page/register'
import Home from '../page/user'
import NotFound from '../page/notFound'
import ProfileUser from '../page/ProfileUser'
import Carts from '../page/cart'
import Heart from '../page/heart'
import ProtectedRouter from '../page/AdminPage/protectedRouter'
import Admin from '../page/AdminPage/admin'
import Product from '../page/product'
import FormContact from '../page/fromContact'

const Router = () => {
  return (
    <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/profile' element={<ProfileUser/>}></Route>
        <Route path='/cart' element={<Carts/>}></Route>
        <Route path='/heart' element={<Heart/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/product' element={<Product/>}></Route>
        <Route path='/formContact' element={<FormContact/>}></Route>
       
        {/* <Route path='/admin' element={<ProtectedRouter/>} >



        </Route> */}

        <Route path='*' element={<NotFound/>} ></Route>
    </Routes>
  )
}

export default Router
