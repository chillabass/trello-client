import { Avatar, Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/styles";

export const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  padding: '30px',
});


export const StyledInfoLeft = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '10px',
});

export const StyledAvatar = styled(Avatar)({
  minWidth: 100,
  minHeight: 100,
  margin: '15px',
});

export const StyledInfoRight = styled(Box)({
  maxWidth: 800,
  marginBottom: '20px',
  marginRight: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center'
});

export const StyledTypography = styled(Typography)({
  display: 'flex',
  flexDirection: 'column',
});
