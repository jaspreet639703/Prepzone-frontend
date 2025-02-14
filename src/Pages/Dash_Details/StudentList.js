import React from 'react';
import { Table, Button, Space, Modal, Form, Input, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './StudentList.css';

const StudentList = ({ students, onEdit, onDelete }) => {
  const [form] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState(null);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
      filters: Array.from(new Set(students?.map(s => s.course) || [])).map(course => ({
        text: course,
        value: course,
      })),
      onFilter: (value, record) => record.course === value,
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.joinDate) - new Date(b.joinDate),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={`status-badge ${status.toLowerCase()}`}>
          {status}
        </span>
      ),
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (student) => {
    setSelectedStudent(student);
    form.setFieldsValue(student);
    setEditModalVisible(true);
  };

  const handleDelete = (student) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this student?',
      content: `This will permanently delete ${student.name}'s record.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        onDelete(student.id);
        message.success('Student deleted successfully');
      },
    });
  };

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onEdit(selectedStudent.id, values);
      setEditModalVisible(false);
      message.success('Student updated successfully');
    } catch (error) {
      message.error('Failed to update student');
    }
  };

  return (
    <div className="student-list">
      <Table
        columns={columns}
        dataSource={students}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} students`,
        }}
      />

      <Modal
        title="Edit Student"
        visible={editModalVisible}
        onOk={handleEditSubmit}
        onCancel={() => setEditModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="course"
            label="Course"
            rules={[{ required: true, message: 'Please enter course' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentList;
