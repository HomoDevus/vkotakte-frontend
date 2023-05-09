import { useParams, Navigate } from 'react-router-dom'
import { useGetImageQuery, useGetUserInfoQuery } from '../../../api/apiSlice'
import { getIdFromToken } from '../../../utils'
import { Descriptions, Image, Spin } from 'antd';
import style from './Profile.module.css'
import PublicationForm from '../PublicationForm';
import Publications from '../Publications';
import { BASE64_PREFIX } from '../../../consts';

export default function Profile() {
  const { userId } = useParams()
  const isMyProfile = Boolean(userId)
  const { data, isLoading, isSuccess, isError, error } = useGetUserInfoQuery(
    userId || '', { skip: !userId }
  )
  const {
    data: avatar,
    isLoading: isAvatarLoading
  } = useGetImageQuery(data?.avatar || '', { skip: !isSuccess })

  if (!userId) {
    return <Navigate to={getIdFromToken() || '/login'} />
  }

  let content

  if (isLoading) {
    content = <Spin size="large" />
  } else if (isSuccess) {
    content = (
      <div className={style.itemsContainer}>
        {
          isAvatarLoading ? <Spin /> : <Image
            width="100%"
            src={BASE64_PREFIX + avatar?.data}
            placeholder={true}
          />
        }
        <Descriptions title="User Info" column={1}>
          <Descriptions.Item label="UserName">{data.name}</Descriptions.Item>
          {data.age && <Descriptions.Item label="Age">{data.age}</Descriptions.Item>}
          {data.city && <Descriptions.Item label="City">{data.city}</Descriptions.Item>}
          {data.education && <Descriptions.Item label="Education" span={2}>{data.education}</Descriptions.Item>}
        </Descriptions>
      </div>
    )
  } else if (isError) {
    content = error.toString()
  }

  return (
    <div>
      <h2 className="page-title">{isMyProfile ? 'My profile' : 'User profile'}</h2>
      <div className={style.profileContent}>
        {content}
        <div className={style.itemsContainer}>
          {isMyProfile && <PublicationForm />}
          <Publications avatar={avatar} />
        </div>
      </div>
    </div>
  )
}
