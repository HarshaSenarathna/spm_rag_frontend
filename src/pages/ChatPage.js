import React, { useState } from 'react';
import { Input, Button, List, Typography, Spin, message } from 'antd';
import axios from 'axios';
import Markdown from 'react-markdown';

const { Search } = Input;

function ChatPage() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState([]);

  const handleAskQuestion = async () => {
    if (!question) return message.warning('Please enter a question.');

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/ask_question`,
        {
          question,
        }
      );
      setResponses([
        { question, answer: response.data.response },
        ...responses,
      ]);
      setQuestion('');
    } catch (error) {
      message.error('Failed to get a response.');
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
      }}>
      <Typography.Title level={2} style={{ textAlign: 'center' }}>
        Chat
      </Typography.Title>
      <div style={{ padding: '10px 20px' }}>
        <Search
          placeholder="Ask a question..."
          enterButton="Ask"
          size="large"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onSearch={handleAskQuestion}
          loading={loading}
        />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
        {loading && <Spin style={{ margin: '20px 0' }} />}
        <List
          itemLayout="vertical"
          dataSource={responses}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text strong style={{ fontSize: '18px' }}>
                Q: {item.question}
              </Typography.Text>
              <Typography.Paragraph style={{ fontSize: '18px' }}>
                A: <Markdown>{item.answer}</Markdown>
              </Typography.Paragraph>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default ChatPage;
