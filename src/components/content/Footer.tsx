import { Layout } from 'antd'

const { Footer: AntFooter } = Layout

export default function Footer() {
  return (
    <AntFooter>
      <p>© {new Date().getFullYear()} VKotakte inc.</p>
    </AntFooter>
  )
}
