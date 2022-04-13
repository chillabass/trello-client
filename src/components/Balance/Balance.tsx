import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components'
import { socket } from '../../api/socket';
import { USER_DEPOSIT, USER_SUBSCRIBE } from '../../utils/constants/socketEventTypes';
import { useAppSelector } from '../../utils/hook/redux';

interface BalanceProps {
  balance: number;
};

export const Balance: React.FC<BalanceProps> = ({ balance }) => {
  const [open, setOpen] = useState(false);
  const [depo, setDepo] = useState(0);

  const onClickHandler = () => {
    setOpen(true);
  };

  const onCloseHandler = () => {
    setOpen(false);
  };

  const id = useAppSelector(state => state.users.currentUser?.id);
  const email = useAppSelector(state => state.users.currentUser?.email);

  const onDepositHandler = () => {
    setOpen(false);
    const data = {
      id,
      depo,
    };
    socket.emit(USER_DEPOSIT, data);
  };

  const onSubscribeHandler = () => {
    setOpen(false);
    socket.emit(USER_SUBSCRIBE, { id, email });
  };


  return (
    <>
      <StyledBalance onClick={onClickHandler}>
        <p>Balance:</p>
        <p>$ {balance}</p>
      </StyledBalance>
      <Dialog open={open}>
        <DialogTitle>Your account</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="money"
            defaultValue={0}
            label='How much do you want to deposit?'
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => setDepo(+e.target.value)}
          />
        </DialogContent>
        <DialogActions style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <StyledButton onClick={onDepositHandler}>Deposit</StyledButton>
          <StyledButton onClick={onSubscribeHandler}>Subscribe</StyledButton>
          <Button onClick={onCloseHandler}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const StyledBalance = styled.div`
  text-align: center;
  color: #eef;
  margin: 0 15px;
  position: relative;
  cursor: pointer;
`;

const StyledButton = styled.button`
  font-size: 15px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background-color: #0842ff;
  padding: 15px 20px;
  box-shadow: 0px 1px 1px 1px #011c57;
  color: #eef;
  width: 100%;
  cursor:pointer;
  transition: 1s;
  
  &:hover {
    background-color: #ff00ff;
  }
`;
