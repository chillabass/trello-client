import React, { useRef } from 'react';
import { Button, Slider, Typography } from '@mui/material/';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/styles';
import { useAppDispatch } from '../store/hooks';

interface FormProps {
  open: boolean;
  setOpen: (flag: boolean) => void;
  dialogTitle: string;
  dialogContentText: string;
  label: string;
  getData: (title: string, priority: number) => void;
}

export const TaskCreateForm: React.FC<FormProps> = ({ open, setOpen, getData, dialogTitle, dialogContentText, label }) => {
  const dispatch = useAppDispatch();
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    setOpen(false);
    const taskTitle: HTMLInputElement | null = document.querySelector('#taskTitle');
    const prioritySlider: HTMLInputElement | null = document.querySelector('#prioritySlider');
    const title = taskTitle?.value.trim() || '';
    const priority = prioritySlider?.innerText || 1;
    getData(title, +priority);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {dialogContentText}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="taskTitle"
          label={label}
          type="text"
          fullWidth
          variant="standard"
          inputProps={{
            maxLength: 255,
          }}
        />
        <Typography 
            sx={{marginTop: '19px;'}}
            gutterBottom>Priority</Typography>
        <PrettoSlider
          id='prioritySlider'
          valueLabelDisplay="auto"
          aria-label="pretto slider"
          defaultValue={1}
          min={1}
          max={5}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

const PrettoSlider = styled(Slider)({
  color: '#3067bb',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#205cb6',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});