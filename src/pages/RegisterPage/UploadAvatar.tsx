import { Upload, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import { beforeUpload, getBase64 } from '../../utils';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import style from './UploadAvatar.module.css'

type Props = { setAvatarFileId: (fileName?: string) => void }

export default function UploadAvatar({ setAvatarFileId }: Props) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    } else if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as RcFile).then((url) => {
        setLoading(false);
        setImageUrl(url);
      });

      try {
        const response = JSON.parse(info.file.xhr.response)
        setAvatarFileId(response._id)
      } catch (err) {
        console.error(err)
      }
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-circle"
      className={style.imageUploader}
      showUploadList={false}
      action={process.env?.REACT_APP_BACKEND_URL + '/upload-avatar'}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      accept="image/png, image/jpeg"
    >
      {imageUrl ? <img src={imageUrl} alt="avatar" className={style.imagePreview} /> : uploadButton}
    </Upload>
  )
}