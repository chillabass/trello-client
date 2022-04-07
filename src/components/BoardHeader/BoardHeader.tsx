import React from "react";
import { StyledBoardHeader, StyledBoardItem } from "./BoardHeader.styles";

interface HeaderProps {
  title: string;
}

export const BoardHeader: React.FC<HeaderProps> = ({ title }) => {
  return (
    <StyledBoardHeader>
      <StyledBoardItem>
        {title}
      </StyledBoardItem>
    </StyledBoardHeader>
  );
};
