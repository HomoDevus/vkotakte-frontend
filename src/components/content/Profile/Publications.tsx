import { useParams } from 'react-router-dom'
import { useGetUserPublicationsQuery } from '../../../api/apiSlice'
import PublicationItem from './PublicationItem'
import { Spin } from 'antd'

export default function Publications() {
  const { userId } = useParams()
  const { data, isLoading } = useGetUserPublicationsQuery(userId as string, {
    skip: !userId,
  })

  return (
    <div>
      {isLoading ? (
        <Spin />
      ) : (
        data?.map(item => <PublicationItem item={item} key={item._id} />)
      )}
    </div>
  )
}
