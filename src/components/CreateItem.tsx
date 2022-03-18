import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface ItemProps {
  title: string;
  href: string;
}

export const CreateItem: React.FC<ItemProps> = ({ title, href }) => {
  return (
    <StyledContainer to={`/desk/${href}`}>
      <Pp>{title}</Pp>
    </StyledContainer>
  );
};

const Pp = styled.p`
  font-size: 15px;
`;

const StyledContainer = styled(Link)`
  margin: 5px;
  padding: 5px 10px;
  width: 150px;
  height: 80px;
  max-width: 150px;
  border: 1px solid #5f5f5f;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
  -webkit-box-shadow: 0px 1px 8px 1px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 1px 8px 1px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 1px 8px 1px rgba(34, 60, 80, 0.2);
  transition: .2s;

  &:hover {
    transform: translateY(-5px);
  }
`;
