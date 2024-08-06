import Admin from './admin';
import { Navigate } from 'react-router-dom';

export default function ProtectedRouter() {
    // nếu như có xác thực người dùng hiện tại là admin thì cho phép hiển thị trang admin rồi điều hướng
    const role = localStorage.getItem('role') as string
  return (
    <>
    {
        role === "ADMIN"? <Admin/>: <Navigate to={"/login"} ></Navigate>
    }
    </>
   
  )
}



