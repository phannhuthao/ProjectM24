import { useState, useEffect } from 'react';
import { fetchAllUsers, updateUserRole, deleteUser, updateUser, addUser } from '../../store/slice/accountslice'; // Import addUser
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Button, Spinner, Table, Modal, Form } from 'react-bootstrap';

export default function Products() {
  const dispatch = useDispatch();
  const { accounts, isLoading } = useSelector((state: RootState) => state.account);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    birthday: '',
    password: ''
  });
  const [errors, setErrors] = useState<any>({}); // Để lưu thông báo lỗi

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleRoleChange = (userId: number, newRole: boolean) => {
    dispatch(updateUserRole({ userId, role: newRole }));
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setFormData({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      birthday: user.birthday,
      password: user.password
    });
    setShowEditModal(true);
  };

  // Hàm kiểm tra lỗi
  const validateForm = () => {
    const newErrors: any = {};

    // Kiểm tra lỗi email
    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!formData.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      newErrors.email = "Email không đúng định dạng, mời bạn nhập lại";
    }

    // Kiểm tra lỗi mật khẩu
    if (!formData.password.trim()) {
      newErrors.password = "Password không được để trống";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password phải có ít nhất 6 kí tự";
    }

    // Kiểm tra lỗi tên đầy đủ
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Tên không được để trống";
    }

    // Kiểm tra lỗi số điện thoại
    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống";
    } else if (!/^\d{10,11}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ, phải có 10-11 chữ số";
    }

    // Kiểm tra lỗi ngày sinh
    if (!formData.birthday.trim()) {
      newErrors.birthday = "Ngày sinh không được để trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Lưu thông tin đã sửa
  const handleSaveEditUser = async () => {
    if (!validateForm()) return;

    try {
      const updatedUserData = { ...formData };
      const userId = selectedUser.id;

      // Gửi request để cập nhật user
      await dispatch(updateUser({ userId, updatedUserData })).unwrap();

      // Lưu dữ liệu vào localStorage
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = storedUsers.map((user: any) =>
        user.id === userId ? { ...user, ...updatedUserData } : user
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Đóng modal
      setShowEditModal(false);
      // Refresh danh sách người dùng
      dispatch(fetchAllUsers());

    } catch (error) {
      console.error("Lỗi không cập nhật được user ", error);
    }
  };


  // Xóa người dùng
  const handleDeleteUser = async (userId: number) => {
    try {
      // Gửi request để xóa user
      await dispatch(deleteUser(userId)).unwrap();
      // Refresh danh sách người dùng
      dispatch(fetchAllUsers());
    } catch (error) {
      console.error("Lỗi không thể xóa user ", error);
    }
  };

  const handleAddUser = async () => {
    if (!validateForm()) return;

    try {
      const newUser = { id: Date.now(), ...formData, role: false };

      // Gửi request để thêm user
      await dispatch(addUser(newUser)).unwrap();

      // Lưu dữ liệu vào localStorage
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      storedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));

      setShowAddModal(false);

      dispatch(fetchAllUsers());

    } catch (error) {
      console.error("Lỗi không thể thêm user", error);
    }
  };

  return (
    <div>
      <h1>Trang quản lí người dùng</h1>

      <div className="d-flex justify-content-end align-items-center mb-3">
        <Button variant="primary" onClick={() => setShowAddModal(true)} className="me-2">Add User</Button>
      </div>

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
            <th colSpan={4}>Action</th>
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
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEditUser(user)}
                >
                  Sửa
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                  Xóa
                </Button>
              </td>
              <td>{user.role ? "" : <Button variant={user.status ? "danger" : "primary"}>{user.status ? "Chặn" : "Bỏ chặn"}</Button>}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Form sửa thông tin người dùng */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa thông tin người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập họ và tên"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              {errors.fullName && <div className="text-danger">{errors.fullName}</div>}
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              {errors.phone && <div className="text-danger">{errors.phone}</div>}
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={formData.birthday}
                onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
              />
              {errors.birthday && <div className="text-danger">{errors.birthday}</div>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveEditUser}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal thêm người dùng */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm người dùng mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập họ và tên"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              {errors.fullName && <div className="text-danger">{errors.fullName}</div>}
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              {errors.phone && <div className="text-danger">{errors.phone}</div>}
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={formData.birthday}
                onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
              />
              {errors.birthday && <div className="text-danger">{errors.birthday}</div>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Thêm User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
