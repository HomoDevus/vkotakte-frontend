import { useParams } from 'react-router-dom';
import { useGetUserPublicationsQuery } from '../../api/apiSlice';
import PublicationItem from './PublicationItem';
import { ImageResponse } from '../../types';
import { Spin } from 'antd';

type Props = { avatar?: ImageResponse }

export default function Publications({ avatar }: Props) {
  const { userId } = useParams()
  const { data, isLoading } = useGetUserPublicationsQuery(userId as string, { skip: !userId })

  return (
    <>
      {isLoading ? <Spin /> : data?.map(item => <PublicationItem item={item} avatar={avatar} key={item._id} />)}
    </>
  )
}