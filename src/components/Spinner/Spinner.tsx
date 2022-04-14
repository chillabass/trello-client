import React from 'react';
import styled from 'styled-components';
import spinner from '../../assets/icon/spinner.png';

export const Spinner: React.FC = () => {
  return (
    <StyledSpinner>
      <img className="spinner" src={spinner} alt="Loading" />
    </StyledSpinner>
  );
};

const StyledSpinner = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #52525250;
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    animation: loading 1.5s infinite linear;
  }


@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;