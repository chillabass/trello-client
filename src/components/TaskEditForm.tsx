import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IEditData } from '../types/editProfile';
import { useAppDispatch } from '../store/hooks';
import { fetchDeleteTask, fetchEditTask } from '../store/asyncActions/taskAction';

interface FormProps {
  open: boolean;
  setOpen: (flag: boolean) => void;
  taskId: number;
};

interface IEditTask {
  id: number;
  columnId?: number;
  title?: string;
  proirity?: number;
  position?: number;
};

export const TaskEditForm: React.FC<FormProps> = ({open, setOpen, taskId}) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    handleClose();
    dispatch(fetchDeleteTask({id: taskId}));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    handleClose();
    const taskTitle: HTMLInputElement | null = document.querySelector('#taskTitle');
    const data: IEditTask = { id: taskId };
    if (taskTitle?.value.trim()) data.title = taskTitle?.value.trim();
    dispatch(fetchEditTask(data));
  };

  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="taskTitle"
            label='Title'
            type="text"
            fullWidth
            variant="standard"
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
