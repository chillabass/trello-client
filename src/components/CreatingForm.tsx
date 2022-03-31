import React from 'react';
import { Button } from '@mui/material/';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface FormProps {
  open: boolean;
  setOpen: (flag: boolean) => void;
  dialogTitle: string;
  dialogContentText: string;
  label: string;
  getData: (title: string) => void;
}

export const FormDialog: React.FC<FormProps> = ({ open, setOpen, getData, dialogTitle, dialogContentText, label }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    setOpen(false);
    const taskTitle: HTMLInputElement | null = document.querySelector('#taskTitle');
    const title = taskTitle?.value.trim() || '';
    getData(title);
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};