import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { socket } from '../../api/socket';
import { COLUMN_DELETE, COLUMN_EDIT } from '../../utils/constants/socketEventTypes';

interface FormProps {
  title: string;
  open: boolean;
  setOpen: (flag: boolean) => void;
  columnId: number;
  deskId: number;
};

interface IEditColumn {
  id: number;
  deskId?: number;
  title?: string;
  position?: number;
};

export const ColumnsEditForm: React.FC<FormProps> = ({title, open, setOpen, columnId, deskId}) => {

  const handleDelete = () => {
    setOpen(false);
    socket.emit(COLUMN_DELETE, {id: columnId, deskId,});
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    setOpen(false);
    const columnTitle: HTMLInputElement | null = document.querySelector('#columnTitle');
    const data: IEditColumn = { id: columnId };
    if (columnTitle?.value.trim()) {
      data.title = columnTitle?.value.trim();
    }
    socket.emit(COLUMN_EDIT, data);
  };

  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Column</DialogTitle>
        <DialogContent>
          <TextField
            defaultValue={title}
            autoFocus
            margin="dense"
            id="columnTitle"
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
