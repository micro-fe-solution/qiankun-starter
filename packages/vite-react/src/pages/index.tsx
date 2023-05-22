import React from 'react';
import { theme, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';

const useStyles = () => {
  const { token } = theme.useToken();

  return {
    container: css({
      color: token.colorPrimary,
    })
  }
}

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const styles = useStyles();

  return (
    <div css={styles.container}>
      <Button onClick={() => { navigate('/dashboard') }}>切换到概览页</Button>
      Index Page
    </div>
  )
}

export default Home;
