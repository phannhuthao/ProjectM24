import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface LogoutModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ show, onHide, onConfirm }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Đăng xuất</Modal.Title>
    </Modal.Header>
    <Modal.Body>Bạn có muốn đăng xuất không?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Không
      </Button>
      <Button variant="primary" onClick={onConfirm}>
        Có
      </Button>
    </Modal.Footer>
  </Modal>
);

export default LogoutModal;
