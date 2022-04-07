import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IAvatar } from '../../types/avatar';

interface FormProps {
  open: boolean;
  setOpen: (flag: boolean) => void;
  getData: (data: IAvatar) => void;
};

export const FileFormDialog: React.FC<FormProps> = ({open, setOpen, getData, }) => {
  const avatar: IAvatar = {
    name: '',
    file: '',
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      avatar.name = e.target.files[0].name;
      avatar.file = e.target.files[0];
    }
  };

  const handleUpload = () => {
    handleClose();
    if (avatar) { 
      getData(avatar);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Load file</DialogTitle>
        <DialogContent>
          <input 
            type="file"
            accept='.jpg,.jpeg,.png'
            onChange={handleChangeFile}     
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpload}>Upload</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
