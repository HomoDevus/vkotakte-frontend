import { Button, Form, Input } from 'antd';
import { useAddPublicationMutation } from '../../api/apiSlice';
import UploadImage from '../common/UploadImage/UploadImage';
import { useCallback, useEffect, useState } from 'react';
import { PublicationRequest } from '../../types';
import { useParams } from 'react-router-dom';

export default function PublicationForm() {
  const {userId} = useParams() as { userId: string }
  const [addPublication, { isLoading, isSuccess }] = useAddPublicationMutation()
  const [imageId, setImageId] = useState<string | undefined>()
  const [form] = Form.useForm()

  useEffect(() => {
    if (isSuccess) {
      form.resetFields()
    }
  }, [isSuccess, form])

  const handlePublish = useCallback((data: PublicationRequest) => {
    addPublication({ ...data, image: imageId, userId })
  }, [imageId, addPublication, userId])

  return (
    <Form
      form={form}
      name="basic"
      onFinish={handlePublish}
      onFinishFailed={err => console.error(err)}
      layout="vertical"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please input title!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Image"
        name="image"
      >
        <UploadImage setFileId={setImageId} listType="picture-card" />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input description!' }]}
      >
        <Input.TextArea rows={8} />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={isLoading}
          loading={isLoading}
        >
          Publish
        </Button>
      </Form.Item>
    </Form>
  )
}
