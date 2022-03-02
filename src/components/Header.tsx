import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Header: React.FC = () => {
  return (
    <StyledHeader>
      <StyledLogo to='/'>Trello</StyledLogo>
      <StyledProfileBlock>
        <StyledButton to='/signup'>Sign Up</StyledButton>
        <StyledButton to='/signin'>Sign In</StyledButton>
        <StyledProfile />
      </StyledProfileBlock>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  height: 50px;
  background-color: #0069a5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  box-shadow: 0px 7px 13px -12px #000;
`;

const StyledLogo = styled(Link)`
  font-size: 30px;
  color: #eef;
  font-weight: bold;
  transition: .2s;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #a3a3a3;
  }
`;

const StyledProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ff9926;
`;

const StyledButton = styled(Link)`
  padding: 10px 10px;
  margin-right: 20px;
  color: #eef;
  border: 1px solid #eef;
  border-radius: 8px;
  text-decoration: none;

  &:hover {
    color: #ff9926;
    border-color: #ff9926;
  }
`;

const StyledProfileBlock = styled.div`
  display: flex;
`;