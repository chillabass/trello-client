import React from 'react';
import styled from 'styled-components';
import { BoardHeader } from '../components/BoardHeader';
import { Column } from '../components/Column';

export const Mainpage: React.FC = () => (
  <>
    <BoardHeader />
    <StyledColumnsWrapper>
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
    </StyledColumnsWrapper>
  </>
  );


const StyledColumnsWrapper = styled.div`
  display: inline-flex;
  width: 100%;
  overflow-x: auto;
`;