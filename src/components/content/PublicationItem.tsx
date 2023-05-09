import { useGetImageQuery } from '../../api/apiSlice';
import { Avatar, Card, Image } from 'antd';
import { ImageResponse, PublicationResponse } from '../../types';
import { BASE64_PREFIX } from '../../consts';

type Props = {
  item: PublicationResponse,
  avatar?: ImageResponse
}

export default function PublicationItem({ item, avatar }: Props) {
  const {
    data: image,
  } = useGetImageQuery(item.image as string, { skip: !item?.image })


  return (
    <Card
      cover={
        image && <Image
          width="100%"
          src={BASE64_PREFIX + image.data}
          placeholder={true}
        />
      }
    >
      <Card.Meta
        title={item.title}
        description={item.description}
        avatar={avatar && <Avatar src={BASE64_PREFIX + avatar.data} />}
      />
    </Card>
  )
}