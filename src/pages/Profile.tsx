import React from 'react';
import { styled } from '@mui/styles';
import { Avatar, Box, Container, Typography } from '@mui/material';

export const Profilepage: React.FC = () => {
  return (
    <MyContainer>
      <Avatar sx={{ width: 100, height: 100 }}/>
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Typography variant="body1" gutterBottom>
          Login:
        </Typography>
      </Box>
    </MyContainer>
  );
}

const MyContainer = styled(Container)({
  display: 'flex',
  padding: '30px 30px',
});