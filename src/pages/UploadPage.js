import React, { useState } from 'react';
import { Upload, Button, message, Typography, Progress } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

function UploadPage() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setProgress(0);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/upload_pdf`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            setProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          },
        }
      );

      message.success(response.data.message);
    } catch (error) {
      message.error('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Typography.Title level={2}>Upload PDF</Typography.Title>
      <Upload accept=".pdf" customRequest={handleUpload} showUploadList={false}>
        <Button icon={<UploadOutlined />} disabled={uploading}>
          Click to Upload PDF
        </Button>
      </Upload>
      {uploading && <Progress percent={progress} />}
    </div>
  );
}

export default UploadPage;
