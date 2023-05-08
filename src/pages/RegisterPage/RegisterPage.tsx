import style from '../AuthPage.module.css'
import { Button, Form, Input, InputNumber } from 'antd';
import { useAuth } from '../../hooks/useAuth';
import { useRegisterMutation } from '../../api/apiSlice';
import { useCallback, useEffect } from 'react';
import { RegisterRequest } from '../../types';
import { useNavigate } from 'react-router-dom';
import UploadAvatar from './UploadAvatar';

export default function RegisterPage() {
  const { setToken } = useAuth()
  const [register, { isLoading, isSuccess, data: registerData }] = useRegisterMutation()
  const navigate = useNavigate()

  const handleRegister = useCallback((data: RegisterRequest) => {
    register(data)
  }, [register])

  useEffect(() => {
    if (isSuccess && registerData?.token) {
      setToken(`Bearer ${registerData.token}`);
      navigate(`/profile`);
    }
  }, [isSuccess, registerData?.token, setToken, navigate])

  return (
    <div className={style.container}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={handleRegister}
        onFinishFailed={(err) => console.error(err)}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
        >
          <InputNumber min="0" max="200" />
        </Form.Item>
        <Form.Item
          label="Avatar"
          name="avatar"
        >
          <UploadAvatar />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" disabled={isLoading} loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}