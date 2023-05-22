import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => { navigate('/') }}>切换到首页</Button>
      Dashboard Page
    </div>
  )
}

export default Dashboard;
