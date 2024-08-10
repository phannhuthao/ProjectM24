import React, { useEffect, useState } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
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

    return (
        <div>
            {isLoading && <Spinner animation='border' variant='danger' />}
            <h1>Trang quản lí sản phẩm</h1>
            
            <div className="d-flex justify-content-end align-items-center mb-3">
                <Button variant="primary" className="me-2" onClick={() => setShowAddModal(true)}>Add Product</Button>
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
                    {products.map((p: ProductType, index: number) => (
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
