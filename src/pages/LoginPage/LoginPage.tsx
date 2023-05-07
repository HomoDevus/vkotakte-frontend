import { useAuth } from '../../hooks/useAuth';
import { Form, Input, Button } from 'antd';
import style from './LoginPage.module.css';

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
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" disabled={isLogging} loading={isLogging}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}