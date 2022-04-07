import styled from "styled-components";

export const StyledIcon = styled.img`
  width: 16px;
  margin-right: 10px;
  opacity: .3;
`;

export const StyledButton = styled.button`
  flex-shrink: 0;
  margin: 10px;
  width: 150px;
  height: 80px;
  max-width: 150px;
  font-size: 15px;
  border: 2px dashed #1faee9;
  border-radius: 5px;
  background-color: #87cefa;
  transition: .2s;
  cursor: pointer;

  &:hover {
    background-color: #7dc2ea;
  }
`;
