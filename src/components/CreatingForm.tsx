import React from 'react';
import Button from '@mui/material/Button';
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
  getTitle: (title: string) => void;
}
export const FormDialog: React.FC<FormProps> = ({ open, setOpen, getTitle, dialogTitle, dialogContentText, label }) => {

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    handleClose();
    const t: HTMLInputElement | null = document.querySelector('#name');
    getTitle(t?.value || '');
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
          id="name"
          label={label}
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};
