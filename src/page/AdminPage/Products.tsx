import React, { useEffect, useState } from 'react';
import { Button, Spinner, Table, Form } from 'react-bootstrap';
import { formatVND } from '../../confirg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProduct, deleteProduct } from '../../store/slice/productSlice';
import { RootState } from '../../store';
import EditProductModal from '../../page/AdminPage/EditProductModal';
import AddProductModal from '../AdminPage/AddToProduct';
import { ProductType } from '../../confirg/interface';

export default function Products() {
    const dispatch = useDispatch();
    const { products, isLoading } = useSelector((state: RootState) => state.product);
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [sortOrder, setSortOrder] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        dispatch(fetchAllProduct());
    }, [dispatch]);

    const handleDelete = (productId: number) => {
        dispatch(deleteProduct(productId));
    };

    const handleEditClick = (product: ProductType) => {
        setSelectedProduct(product);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedProduct(null);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    // Filter and sort products
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery)
    );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOrder === 'ascending') {
            return a.price - b.price;
        } else if (sortOrder === 'descending') {
            return b.price - a.price;
        }
        return 0;
    });

    return (
        <div>
            {isLoading && <Spinner animation='border' variant='danger' />}
            <h1>Trang quản lí sản phẩm</h1>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <Form className="d-flex align-items-center">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        onChange={handleSearchChange}
                    />
                </Form>

                <div className="d-flex align-items-center">
            <label htmlFor="sort-order" className="me-2">Sắp xếp theo giá:</label>
            <select id="sort-order" onChange={handleSortChange} value={sortOrder} className="me-3">
                <option value="">Chọn sắp xếp</option>
                <option value="ascending">Giá: Thấp đến Cao</option>
                <option value="descending">Giá: Cao đến Thấp</option>
            </select>


                <Button variant="primary" className="me-2" onClick={() => setShowAddModal(true)}>Add Product</Button>
            </div>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedProducts.map((p: ProductType, index: number) => (
                        <tr key={p.id}>
                            <td>{index + 1}</td>
                            <td>{p.name}</td>
                            <td>
                                <img src={p.image} alt={p.name} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                            </td>
                            <td>{formatVND.format(p.price)}</td>
                            <td>{p.quantity}</td>
                            <td>
                                <Button variant='warning' onClick={() => handleEditClick(p)}>Sửa</Button>
                            </td>
                            <td>
                                <Button variant='danger' onClick={() => handleDelete(p.id)}>Xóa</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {selectedProduct && (
                <EditProductModal
                    show={showEditModal}
                    onHide={handleCloseEditModal}
                    product={selectedProduct}
                />
            )}

            <AddProductModal
                show={showAddModal}
                onHide={handleCloseAddModal}
            />
        </div>
    );
}
