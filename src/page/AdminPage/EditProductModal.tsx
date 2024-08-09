import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ProductType } from '../../confirg/interface';
import { useDispatch } from 'react-redux';
import { editProduct } from '../../store/slice/productSlice';

interface EditProductModalProps {
    show: boolean;
    onHide: () => void;
    product: ProductType;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ show, onHide, product }) => {
    const [formData, setFormData] = useState<ProductType>(product);
    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(editProduct(formData));
        onHide(); // Close the modal after submission
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formProductName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductImage">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditProductModal;
