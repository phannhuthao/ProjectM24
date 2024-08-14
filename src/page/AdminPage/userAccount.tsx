import { useState, useEffect } from 'react';
import { fetchAllUsers, updateUserRole, deleteUser, updateUser, addUser } from '../../store/slice/accountslice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Button, Spinner, Table, Modal, Form, Pagination } from 'react-bootstrap';

// Thay đổi số lượng người dùng mỗi trang theo nhu cầu
const ITEMS_PER_PAGE = 10;

export default function Products() {
  const dispatch = useDispatch();
  const { accounts, isLoading } = useSelector((state: RootState) => state.account);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false); // New state for role modal
  const [selectedUser, setSelectedUser] = useState<any>(null);
  // const [formData, setFormData] = useState({
  //   fullName: '',
  //   email: '',
  //   phone: '',
  //   birthday: '',
  //   password: ''
  // });
  const [errors, setErrors] = useState<any>({});
  const [sortedAccounts, setSortedAccounts] = useState(accounts);
  const [sortOrder, setSortOrder] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>(''); // New state for selected role

  // Trạng thái phân trang
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    handleSort(sortOrder);
  }, [accounts, sortOrder]);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, accounts]);

  const handleSort = (order: string) => {
    let sorted = [...accounts];
    if (order === 'ascending') {
      sorted.sort((a, b) => a.fullName.localeCompare(b.fullName));
    } else if (order === 'descending') {
      sorted.sort((a, b) => b.fullName.localeCompare(a.fullName));
    }
    setSortedAccounts(sorted);
  };

  const handleSearch = (query: string) => {
    const filteredAccounts = accounts.filter(user =>
      user.fullName.toLowerCase().includes(query.toLowerCase())
    );
    setSortedAccounts(filteredAccounts);
  };

  // Tính toán các trang và phân trang người dùng
  const totalPages = Math.ceil(sortedAccounts.length / ITEMS_PER_PAGE);
  const paginatedAccounts = sortedAccounts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // const handleRoleChange = (userId: number, newRole: string) => {
  //   dispatch(updateUserRole({ userId, role: newRole }));
  //   setShowRoleModal(false); // Close the role modal
  // };

  // const handleEditUser = (user: any) => {
  //   setSelectedUser(user);
  //   setFormData({
  //     fullName: user.fullName,
  //     email: user.email,
  //     phone: user.phone,
  //     birthday: user.birthday,
  //     password: user.password
  //   });
  //   setShowEditModal(true);
  // };

  // const validateForm = () => {
  //   const newErrors: any = {};

  //   if (!formData.email.trim()) {
  //     newErrors.email = "Email không được để trống";
  //   } else if (!formData.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
  //     newErrors.email = "Email không đúng định dạng, mời bạn nhập lại";
  //   }

  //   if (!formData.password.trim()) {
  //     newErrors.password = "Password không được để trống";
  //   } else if (formData.password.length < 6) {
  //     newErrors.password = "Password phải có ít nhất 6 kí tự";
  //   }

  //   if (!formData.fullName.trim()) {
  //     newErrors.fullName = "Tên không được để trống";
  //   }

  //   if (!formData.phone.trim()) {
  //     newErrors.phone = "Số điện thoại không được để trống";
  //   } else if (!/^\d{10,11}$/.test(formData.phone)) {
  //     newErrors.phone = "Số điện thoại không hợp lệ, phải có 10-11 chữ số";
  //   }

  //   if (!formData.birthday.trim()) {
  //     newErrors.birthday = "Ngày sinh không được để trống";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // const handleSaveEditUser = async () => {
  //   if (!validateForm()) return;

  //   try {
  //     const updatedUserData = { ...formData };
  //     const userId = selectedUser.id;

  //     await dispatch(updateUser({ userId, updatedUserData })).unwrap();

  //     const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
  //     const updatedUsers = storedUsers.map((user: any) =>
  //       user.id === userId ? { ...user, ...updatedUserData } : user
  //     );
  //     localStorage.setItem('users', JSON.stringify(updatedUsers));

  //     setShowEditModal(false);
  //     dispatch(fetchAllUsers());

  //   } catch (error) {
  //     console.error("Lỗi không cập nhật được user ", error);
  //   }
  // };

  const handleDeleteUser = async (userId: number) => {
    try {
      await dispatch(deleteUser(userId)).unwrap();
      dispatch(fetchAllUsers());
    } catch (error) {
      console.error("Lỗi không thể xóa user ", error);
    }
  };

  // const handleAddUser = async () => {
  //   if (!validateForm()) return;

  //   try {
  //     const newUser = { id: Date.now(), ...formData, role: 'User' }; // Default role as 'User'

  //     await dispatch(addUser(newUser)).unwrap();

  //     const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
  //     storedUsers.push(newUser);
  //     localStorage.setItem('users', JSON.stringify(storedUsers));

  //     setShowAddModal(false);
  //     dispatch(fetchAllUsers());

  //   } catch (error) {
  //     console.error("Lỗi không thể thêm user", error);
  //   }
  // };

  const openRoleModal = (user: any) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setShowRoleModal(true);
  };

  return (
    <div>
      <h1>Trang quản lí người dùng</h1>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Form className="d-flex align-items-center">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form>
        <select id="sort-order" className="d-flex align-items-right" onChange={(e) => setSortOrder(e.target.value)}>
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
            <th colSpan={3}>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedAccounts.map((user, index) => (
            <tr key={user.id}>
              <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
              <td>{user.email}</td>
              <td>{user.fullName}</td>
              <td>{user.phone}</td>
              <td>{user.birthday}</td>
              <td>{user.role}</td>
              {/* <td>
                <Button variant="warning" onClick={() => handleEditUser(user)}>Edit</Button>
              </td> */}
              <td>
                <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
              </td>
              <td>
                <Button variant="info" onClick={() => openRoleModal(user)}>Assign Role</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              {errors.fullName && <p className="text-danger">{errors.fullName}</p>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              {errors.phone && <p className="text-danger">{errors.phone}</p>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={formData.birthday}
                onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
              />
              {errors.birthday && <p className="text-danger">{errors.birthday}</p>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {errors.password && <p className="text-danger">{errors.password}</p>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveEditUser}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              {errors.fullName && <p className="text-danger">{errors.fullName}</p>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              {errors.phone && <p className="text-danger">{errors.phone}</p>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={formData.birthday}
                onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
              />
              {errors.birthday && <p className="text-danger">{errors.birthday}</p>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {errors.password && <p className="text-danger">{errors.password}</p>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddUser}>Add User</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRoleModal} onHide={() => setShowRoleModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Role</Form.Label>
              <Form.Control as="select" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                <option value="Guest">Khách</option>
                <option value="User">Người dùng</option>
                <option value="Admin">Admin</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRoleModal(false)}>Close</Button>
          <Button variant="primary" onClick={() => handleRoleChange(selectedUser.id, selectedRole)}>Save Role</Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
}
