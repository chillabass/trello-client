import React from 'react';
import styled from 'styled-components';

export const NotFoundpage: React.FC = () => (
  <StyledNotFound>Page not found!</StyledNotFound>
);

const StyledNotFound = styled.div`
  background-color: #0069a5;
  text-align: center;
  color: #eee;
  font-size: 35px;
  height: 100vh;
`;
