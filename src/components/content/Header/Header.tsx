import { Button } from 'antd'
import { useAuth } from '../../../hooks/useAuth'
import { Layout } from 'antd'
import style from './Header.module.css'

const { Header: AntHeader } = Layout

export default function Header() {
  const { logout } = useAuth()

  return (
    <AntHeader className={style.container}>
      <div>
        В <span>Кот</span>акте
      </div>
      <Button onClick={logout}>Выйти</Button>
    </AntHeader>
  )
}
