import React from 'react';
import styled from 'styled-components';
import { BoardHeader } from '../components/BoardHeader';
import { Column } from '../components/Column';

export const Mainpage: React.FC = () => (
  <>
    <BoardHeader />
    <StyledColumnWrapper>
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
    </StyledColumnWrapper>
  </>
  );


const StyledColumnWrapper = styled.div`
  display: flex;
`;