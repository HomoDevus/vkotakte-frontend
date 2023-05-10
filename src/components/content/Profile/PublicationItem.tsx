import { useGetImageQuery, useGetUserInfoQuery, useLikePublicationMutation } from '../../../api/apiSlice';
import { Avatar, Button, Card, Image } from 'antd';
import { PublicationResponse } from '../../../types';
import { BASE64_PREFIX } from '../../../consts';
import { LikeFilled, LikeOutlined } from '@ant-design/icons';
import { useCallback, useState } from 'react';
import { getIdFromToken } from '../../../utils';
import style from './PublicationItem.module.css'

type Props = {
  item: PublicationResponse
}

export default function PublicationItem({ item }: Props) {
  const {
    data: image,
  } = useGetImageQuery(item.image as string, { skip: !item?.image })
  const {
    data: user
  } = useGetUserInfoQuery(item.userId)
  const { data: avatar } = useGetImageQuery(user?.avatar as string, { skip: !user?.avatar })
  const [likePublication] = useLikePublicationMutation()
  const userId = getIdFromToken() as string
  const [isLiked, setIsLiked] = useState(item.likes?.includes(userId))
  const [likesAmount, setLikesAmount] = useState(item.likes?.length || 0)

  const handleLikeClick = useCallback(() => {
    likePublication({ publicationId: item._id, like: !isLiked })
    setLikesAmount(prev => isLiked ? prev - 1 : prev + 1)
    setIsLiked(prev => !prev)
  }, [isLiked, setLikesAmount, setIsLiked, likePublication, item._id])

  return (
    <Card
      className={style.item}
      title={item.title}
      cover={
        image && <Image
          width="100%"
          src={BASE64_PREFIX + image.data}
          placeholder={true}
        />
      }
      actions={[
        <Button className={style.likeButton} onClick={handleLikeClick}>
          {likesAmount} {isLiked ? <LikeFilled /> : <LikeOutlined />}
        </Button>
      ]}
    >
      <Card.Meta
        title={user?.name}
        avatar={avatar && <Avatar src={BASE64_PREFIX + avatar.data} />}
      />
      <p className={style.description}>{item.description}</p>
    </Card>
  )
}