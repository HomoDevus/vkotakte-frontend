import { useGetUsersQuery } from '../../../api/apiSlice';
import { List } from 'antd';
import UserItem from './UserItem';

export default function Users() {
  const {data, isLoading} = useGetUsersQuery()

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <UserItem item={item} key={item._id} />
      )}
      loading={isLoading}
    />
  )
}