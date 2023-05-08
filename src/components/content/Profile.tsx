import { useParams, Navigate } from 'react-router-dom';
import { useGetUserInfoQuery } from '../../api/apiSlice';
import { getIdFromToken } from '../../utils';

export default function Profile() {
  const { userId } = useParams()
  const isMyProfile = Boolean(userId)
  const { data, isLoading, isSuccess, isError, error } = useGetUserInfoQuery(userId || getIdFromToken() || '')

  if (!userId) {
    return <Navigate to={getIdFromToken() || '/login'} />
  }

  let content

  if (isLoading) {
    content = 'Loading...'
  } else if (isSuccess) {
    content = data.name
  } else if (isError) {
    content = error.toString()
  }

  return (
    <div>
      <h2>{isMyProfile ? 'My profile' : 'User profile'}</h2>
      <p>Profile info</p>
    </div>
  )
}