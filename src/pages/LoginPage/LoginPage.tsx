import { useAuth } from '../../hooks/useAuth';
import { Form, Input, Button } from 'antd';
import style from '../AuthPage.module.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const { login, isLogging } = useAuth()

  return (
    <div className={style.container}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={login}
        onFinishFailed={(err) => console.error(err)}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <div className={style.submitContainer}>
            <Button type="primary" htmlType="submit" disabled={isLogging} loading={isLogging}>
              Submit
            </Button>
            <div>Or <Link to="/register">register now!</Link></div>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}