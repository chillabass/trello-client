import React from 'react';
import styled from 'styled-components';

interface ItemProps {
  title: string;
  href: string;
}

export const CreateItem: React.FC<ItemProps> = ({ title, href }) => {
  return (
    <StyledContainer href={href}>
      {title}
    </StyledContainer>
  );
};

const StyledContainer = styled.a`
  margin: 5px;
  padding: 5px 10px;
  width: 150px;
  height: 80px;
  max-width: 150px;
  font-size: 15px;
  border: 1px solid #5f5f5f;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
  -webkit-box-shadow: 0px 1px 8px 1px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 1px 8px 1px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 1px 8px 1px rgba(34, 60, 80, 0.2);
`;
