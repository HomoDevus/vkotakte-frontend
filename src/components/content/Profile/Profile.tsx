import { useParams, Navigate } from 'react-router-dom'
import { useGetAvatarQuery, useGetUserInfoQuery } from '../../../api/apiSlice'
import { getIdFromToken } from '../../../utils'
import { Descriptions, Image, Spin } from 'antd';
import style from './Profile.module.css'

export default function Profile() {
  const { userIdParam } = useParams()
  const userId = userIdParam || getIdFromToken()
  const isMyProfile = Boolean(userId)
  const { data, isLoading, isSuccess, isError, error } = useGetUserInfoQuery(
    userId || '', { skip: !userId }
  )
  const {
    data: avatar,
    isLoading: isAvatarLoading
  } = useGetAvatarQuery(data?.avatar || '', { skip: !isSuccess })

  if (!userId) {
    return <Navigate to={getIdFromToken() || '/login'} />
  }

  let content

  if (isLoading) {
    content = <Spin size="large" />
  } else if (isSuccess) {
    content = (
      <div className={style.profileContent}>
        <div className={style.profileInfo}>
          {
            isAvatarLoading ? <Spin /> : <Image
              width="100%"
              src={`data:image/png;base64,${avatar?.data}`}
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
        <div>

        </div>
      </div>
    )
  } else if (isError) {
    content = error.toString()
  }

  return (
    <div>
      <h2 className="page-title">{isMyProfile ? 'My profile' : 'User profile'}</h2>
      {content}
    </div>
  )
}
