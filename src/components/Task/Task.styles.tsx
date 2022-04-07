import styled from 'styled-components';
import editIcon from '../../assets/icon/edit.svg';

export const StyledTask = styled.div<{color: string;}>`
  position: relative;
  padding: 5px;
  margin: 5px 0;
  background-color: ${props => props.color};
  border-radius: 3px;
  box-shadow: 0px 1px 6px -1px #444;
  cursor: pointer;

  &:hover .task-overlay {
    opacity: 1;
  }
`;

export const StyledParagraph = styled.p`
word-wrap: break-word;
padding-right: 15px;
`;

export const StyledOverlay = styled.div`
opacity: 0;
position: absolute;
transition: .2s;
top: 0;
left: 0;
width: 100%;
height: 100%;
border-radius: inherit;
background-image: url(${editIcon});
background-position: 98%;
background-size: 8%;
background-repeat: no-repeat;
background-color: rgba(170, 170, 170, 0.3);
`;
