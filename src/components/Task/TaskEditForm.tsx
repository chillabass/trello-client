import React from 'react';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/styles';
import { Typography } from '@mui/material';
import { socket } from '../../api/socket';

interface FormProps {
  open: boolean;
  setOpen: (flag: boolean) => void;
  taskId: number;
  columnId: number;
  priority: number;
  title: string;
  description: string;
};

interface IEditTask {
  id: number;
  columnId?: number;
  title?: string;
  description?: string;
  priority?: number;
  position?: number;
};

export const TaskEditForm: React.FC<FormProps> = ({ open, setOpen, taskId, columnId, priority, title, description }) => {
  const handleDelete = () => {
    setOpen(false);
    socket.emit('task:delete', { id: taskId, columnId, });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    setOpen(false);
    const taskTitle: HTMLInputElement | null = document.querySelector('#taskTitle');
    const prioritySlider: HTMLInputElement | null = document.querySelector('#prioritySlider');
    const taskDescription: HTMLInputElement | null = document.querySelector('#taskDescription');
    const data: IEditTask = { id: taskId };
    if (taskTitle?.value.trim()) data.title = taskTitle?.value.trim();
    if (prioritySlider?.innerText) data.priority = +prioritySlider?.innerText;
    if (taskDescription?.value) data.description = taskDescription?.value.trim();
    socket.emit('task:edit', data);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          id="taskTitle"
          label="Title"
          type="text"
          fullWidth
          defaultValue={title}
          variant="standard"
          inputProps={{
            maxLength: 255,
          }}
        />
        <TextField
          sx={{ marginTop: '19px;' }}
          id="taskDescription"
          label="Description"
          multiline
          type="text"
          fullWidth
          defaultValue={description}
          variant="standard"
          inputProps={{
            maxLength: 255,
          }}
        />
        <Typography
          sx={{ marginTop: '19px;' }}
          gutterBottom>Priority</Typography>
        <PrettoSlider
          id='prioritySlider'
          valueLabelDisplay="auto"
          aria-label="pretto slider"
          defaultValue={priority}
          min={1}
          max={5}
        />
      </DialogContent>
      <DialogActions>
        <Button color="error" variant="text" onClick={handleDelete}>Delete</Button>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleEdit}>Edit</Button>
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
