import { UserResponse } from '../../types';
import { Avatar, List } from 'antd';
import { BASE64_PREFIX } from '../../consts';
import { useGetImageQuery } from '../../api/apiSlice';
import { Link } from 'react-router-dom';

type Props = {
  item: UserResponse;
}

export default function UserItem({item}: Props) {
  const {
    data: avatar,
    isSuccess
  } = useGetImageQuery(item.avatar as string, { skip: !item?.avatar })

  return (
    <List.Item
      actions={[<Link to={`/profile/${item._id}`}>Show profile</Link>]}
    >
      <List.Item.Meta
        avatar={isSuccess && <Avatar src={BASE64_PREFIX + avatar?.data} />}
        title={<a href="https://ant.design">{item.name}</a>}
        description=""
      />
    </List.Item>
  )
}