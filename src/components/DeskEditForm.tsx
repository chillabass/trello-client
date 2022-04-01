import React, { SyntheticEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch } from '../store/hooks';
import { fetchDeleteDesk, fetchEditDesk } from '../store/asyncActions/deskActions';
import { IDesk } from '../types/desk';

interface FormProps {
  open: boolean;
  setOpen: (flag: boolean) => void;
  id: number;
};

interface IEditDesk {
  id: number;
  title?: string;
}

export const DeskEditForm: React.FC<FormProps> = ({open, setOpen, id}) => {
  const dispatch = useAppDispatch();

  const handleDelete = (e: SyntheticEvent) => {
    e.preventDefault();
    setOpen(false);
    dispatch(fetchDeleteDesk({ id }));
  };

  const handleClose = (e: SyntheticEvent) => {
    e.preventDefault();
    setOpen(false);
  };

  const handleEdit = (e: SyntheticEvent) => {
    e.preventDefault();
    setOpen(false);
    const deskTitle: HTMLInputElement | null = document.querySelector('#deskTitle');
    const data = { 
      id,
      title: deskTitle?.value.trim(),
    };
    dispatch(fetchEditDesk(data));
  };

  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Desk</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="deskTitle"
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
