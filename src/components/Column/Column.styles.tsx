import styled from "styled-components";
import editIcon from '../../assets/icon/edit.svg';

export const StyledColumn = styled.div`
  min-height: 30px;
  height: fit-content;
  width: 300px;
  background-color: #ebecf0;
  border-radius: 5px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0px 3px 12px 1px #8b8b8b;
  flex-shrink: 0;
`;

export const StyledColumnHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const StyledColumnTitle = styled.div`
  width: 85%;
  cursor: pointer;
`;

export const StyledColumnMenu = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
  position: relative;
  background-image: url(${editIcon});
  background-size: 15px;
  background-repeat: no-repeat;
  background-position: center;

  &:hover .styled-menu {
    visibility: visible;
    width: fit-content;
    min-height: 50px;
  }
`;

export const StyledMenu = styled.div`
  padding: 5px;
  left: 25px;
  position: absolute;
  display: inline-block;
  background-color: rgba(10, 10, 10, .7);
  border-radius: 5px;
  z-index: 1;
  visibility: hidden;
`;

export const StyledColumnButton = styled.div`
  padding: 10px 18px;
  background-color: transparent;
  color: #eee;
  border-radius: 5px;
  
  &:hover {
    background-color: #7c7c7c;
  }
`;

export const StyledFooter = styled.button`
  display: flex;
  justify-content: flex-start;
  padding: 5px;
  margin: 5px 0;
  border:none;
  border-radius: 3px;
  color: #888;
  font-size: 15px;
  box-shadow: 0px 1px 6px -3px #444;
  transition: .2s;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0px 1px 6px -1px #0068a2;
  }
`;

export const StyledIcon = styled.img`
  width: 16px;
  margin-right: 10px;
  opacity: .3;
`;