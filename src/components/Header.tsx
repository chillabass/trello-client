import React from 'react';
import './Header.css';
import styled from 'styled-components';

export const Header: React.FC = () => {
  return (
    <header className='header'>
      <div className='logo'>Trello</div>
      <div className='profile'></div>
    </header>
  );
}

// const StyledHeader = styled.header`
//   &{
//     width: 100%;
//     height: 50px;
//     background-color: #333;
//   }
// `;