import { useGetFeedQuery } from '../../../api/apiSlice';
import { Spin } from 'antd';
import PublicationItem from '../Profile/PublicationItem';

export default function Feed() {
  const {data, isLoading} = useGetFeedQuery()

  return (
    <div>
      {isLoading ? <Spin /> : data?.map(item => <PublicationItem item={item} key={item._id} />)}
    </div>
  )
}