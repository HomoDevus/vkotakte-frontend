import { Layout, MenuProps, Menu as AntMenu } from 'antd'
import React, { useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const items: MenuItem[] = [getItem('Profile', 'profile')]

export default function Menu() {
  const location = useLocation()
  const selectedItem = useMemo(
    () => location.pathname.split('/').filter(Boolean)[0],
    [location.pathname],
  )
  const navigate = useNavigate()

  const handleMenuItemClick = useCallback(
    (info: { key: string }) => {
      navigate(info.key)
    },
    [navigate],
  )

  return (
    <Sider theme='light'>
      <AntMenu
        mode='inline'
        items={items}
        selectedKeys={[selectedItem]}
        onClick={handleMenuItemClick}
      />
    </Sider>
  )
}
