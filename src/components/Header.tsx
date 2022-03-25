import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PROTOCOL, SERVER_HOST, SERVER_PORT } from '../config';
import { useAppSelector } from '../store/hooks';
import { store } from '../store/store';
import { IUserData } from '../types/user';

export const Header: React.FC = () => {
  const isAuth = useAppSelector(state => state.users.isAuth);
  const user = useAppSelector(state => state.users.currentUser);

  return (
    <StyledHeader>
      <StyledLogo to='/'>Trello</StyledLogo>
      <StyledProfileBlock>
        {isAuth ?
          <StyledProfile to='/profile'>
            <StyledAvatar 
              url={`${PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/${user.avatar}`}
            />
          </StyledProfile> :
          <>
            <StyledButton to='/signup'>Sign Up</StyledButton>
            <StyledButton to='/signin'>Sign In</StyledButton>
          </>}
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

const StyledProfile = styled(Link)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ff9926;
  cursor: pointer;
`;

const StyledAvatar = styled.img<{ url: string; }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url(${props => props.url});
  background-size: contain;
`;

const StyledButton = styled(Link)`
  padding: 10px 10px;
  margin-right: 20px;
  color: #eef;
  border: 1px solid #eef;
  border-radius: 8px;
  text-decoration: none;
  transition: .2s;

  &:hover {
    color: #ff9926;
    border-color: #ff9926;
  }
`;

const StyledProfileBlock = styled.div`
  display: flex;
`;