import React from 'react';
import Avatar from '@mui/material/Avatar';
import { BASE_URL } from '../../utils/constants/server';
import { useAppSelector } from '../../utils/hook/redux';
import {
  StyledButton,
  StyledHeader,
  StyledLogo,
  StyledProfile,
  StyledProfileBlock
} from './Header.styles';

export const Header: React.FC = () => {
  const user = useAppSelector(state => state.users.currentUser);

  return (
    <StyledHeader>
      <StyledLogo to='/'>Trello</StyledLogo>
      <StyledProfileBlock>
        {user ?
          <StyledProfile to='/profile'>
            <Avatar src={user.avatar ? `${BASE_URL}/${user.avatar}` : ''} />
          </StyledProfile> :
          <>
            <StyledButton to='/signup'>Sign Up</StyledButton>
            <StyledButton to='/signin'>Sign In</StyledButton>
          </>}
      </StyledProfileBlock>
    </StyledHeader>
  );
};
