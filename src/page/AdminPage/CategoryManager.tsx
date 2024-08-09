import React, { useState } from 'react';
import { Button, Form, Input, List, Modal, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<string[]>(['Category 1', 'Category 2']);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  
  const showModal = (category?: string) => {
    setEditingCategory(category || null);
    form.setFieldsValue({ name: category || '' });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingCategory) {
        setCategories(prevCategories =>
          prevCategories.map(cat => (cat === editingCategory ? values.name : cat))
        );
        message.success('Category updated successfully!');
      } else {
        setCategories(prevCategories => [...prevCategories, values.name]);
        message.success('Category added successfully!');
      }
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (category: string) => {
    setCategories(prevCategories => prevCategories.filter(cat => cat !== category));
    message.success('Category deleted successfully!');
  };

  return (
    <>
      <Button type="primary" onClick={() => showModal()} icon={<PlusOutlined />}>
        Add Category
      </Button>
      <List
        bordered
        dataSource={categories}
        renderItem={item => (
          <List.Item
            actions={[
              <Button icon={<EditOutlined />} onClick={() => showModal(item)} />,
              <Button icon={<DeleteOutlined />} onClick={() => handleDelete(item)} />
            ]}
          >
            {item}
          </List.Item>
        )}
      />
      <Modal
        title={editingCategory ? 'Edit Category' : 'Add Category'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: 'Please input the category name!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CategoryManager;
