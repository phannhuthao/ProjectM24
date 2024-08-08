import { useEffect } from 'react';
import { fetchAllUsers, updateUserRole } from '../../store/slice/accountslice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Button, Spinner, Table } from 'react-bootstrap';

export default function Products() {
  const dispatch = useDispatch();
  const { accounts, isLoading } = useSelector((state: RootState) => state.account);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleRoleChange = (userId: number, newRole: boolean) => {
    dispatch(updateUserRole({ userId, role: newRole }));
  };

  return (
    <div>
      <h1>Trang quản lí người dùng</h1>
      {isLoading && <Spinner animation="border" variant="danger" />}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Email</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Birthday</th>
            <th>Role</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.fullName}</td>
              <td>{user.phone}</td>
              <td>{user.birthday}</td>
              <td>
                <Button
                  variant={user.role ? "success" : "secondary"}
                  onClick={() => handleRoleChange(user.id, !user.role)}
                >
                  {user.role ? "Admin" : "User"}
                </Button>
              </td>
              <td><Button variant="warning">Sửa</Button></td>
              <td><Button variant="danger">Xóa</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
