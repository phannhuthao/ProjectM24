import { useState, useEffect } from 'react';
import { fetchAllUsers, updateUserRole, deleteUser, updateUser, addUser } from '../../store/slice/accountslice';
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
  const [errors, setErrors] = useState<any>({});
  const [sortedAccounts, setSortedAccounts] = useState(accounts);
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    handleSort(sortOrder);
  }, [accounts, sortOrder]);

  const handleSort = (order: string) => {
    let sorted = [...accounts];
    if (order === 'ascending') {
      sorted.sort((a, b) => a.fullName.localeCompare(b.fullName));
    } else if (order === 'descending') {
      sorted.sort((a, b) => b.fullName.localeCompare(a.fullName));
    }
    setSortedAccounts(sorted);
  };

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

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!formData.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      newErrors.email = "Email không đúng định dạng, mời bạn nhập lại";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password không được để trống";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password phải có ít nhất 6 kí tự";
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Tên không được để trống";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống";
    } else if (!/^\d{10,11}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ, phải có 10-11 chữ số";
    }

    if (!formData.birthday.trim()) {
      newErrors.birthday = "Ngày sinh không được để trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveEditUser = async () => {
    if (!validateForm()) return;

    try {
      const updatedUserData = { ...formData };
      const userId = selectedUser.id;

      await dispatch(updateUser({ userId, updatedUserData })).unwrap();

      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = storedUsers.map((user: any) =>
        user.id === userId ? { ...user, ...updatedUserData } : user
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      setShowEditModal(false);
      dispatch(fetchAllUsers());

    } catch (error) {
      console.error("Lỗi không cập nhật được user ", error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await dispatch(deleteUser(userId)).unwrap();
      dispatch(fetchAllUsers());
    } catch (error) {
      console.error("Lỗi không thể xóa user ", error);
    }
  };

  const handleAddUser = async () => {
    if (!validateForm()) return;

    try {
      const newUser = { id: Date.now(), ...formData, role: false };

      await dispatch(addUser(newUser)).unwrap();

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
        <select id="sort-order" className="me-3" onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Chọn sắp xếp</option>
          <option value="ascending">A đến Z</option>
          <option value="descending">Z đến A</option>
        </select>
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
          {sortedAccounts.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
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

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm người dùng mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAddFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập họ và tên"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              {errors.fullName && <div className="text-danger">{errors.fullName}</div>}
            </Form.Group>
            <Form.Group controlId="formAddEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </Form.Group>
            <Form.Group controlId="formAddPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </Form.Group>
            <Form.Group controlId="formAddPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              {errors.phone && <div className="text-danger">{errors.phone}</div>}
            </Form.Group>
            <Form.Group controlId="formAddBirthday">
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
            Thêm người dùng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
