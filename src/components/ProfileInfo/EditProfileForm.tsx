import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IEditData } from '../../types/editProfile';

interface FormProps {
  open: boolean;
  setOpen: (flag: boolean) => void;
  getData: (data: IEditData) => void;
};

export const EditFormDialog: React.FC<FormProps> = ({open, setOpen, getData, }) => {

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    handleClose();
    const nameInput: HTMLInputElement | null = document.querySelector('#fullName');
    const passInput: HTMLInputElement | null = document.querySelector('#password');
    let data: IEditData = {};
    if (nameInput?.value.trim()) data.fullName = nameInput?.value.trim();
    if (passInput?.value.trim()) data.password = passInput?.value.trim();
    getData(data);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="fullName"
            label='Full name'
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="password"
            label='Password'
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Accept</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
