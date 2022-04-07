import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledHeader = styled.header`
  height: 50px;
  background-color: #0069a5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  box-shadow: 0px 7px 13px -12px #000;
`;

export const StyledLogo = styled(Link)`
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

export const StyledProfile = styled(Link)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ff9926;
  cursor: pointer;
`;

export const StyledButton = styled(Link)`
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

export const StyledProfileBlock = styled.div`
  display: flex;
`;