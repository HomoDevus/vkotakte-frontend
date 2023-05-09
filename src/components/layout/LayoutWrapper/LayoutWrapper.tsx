import Header from '../../content/Header/Header'
import Menu from '../Menu'
import { Outlet } from 'react-router-dom'
import Footer from '../../content/Footer'
import React from 'react'
import { Layout } from 'antd'
import style from './LayoutWrapper.module.css'

const { Content } = Layout

export default function LayoutWrapper() {
  return (
    <Layout className={style.container}>
      <Header />
      <Layout>
        <Menu />
        <Content className={style.content}>
          <Outlet />
        </Content>
      </Layout>
      <Footer />
    </Layout>
  )
}
