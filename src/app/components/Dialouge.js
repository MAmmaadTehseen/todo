import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { LoadingButton } from '@mui/lab';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ isOpenDelete, setIsOpenDelete, deleteTodo, Deleted, id, task }) {
  const [loading, setLoading] = React.useState(false)

  const handleAgree = async () => {
    setLoading(true)
    await deleteTodo(id)
    setIsOpenDelete(false);
    Deleted()
    setLoading(false)
  };

  const handleDisagree = () => {
    setIsOpenDelete(false);
  };

  return (
    <React.Fragment>
      <div>

      </div>

      <Dialog
        open={isOpenDelete}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDisagree}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete that {task}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='success' variant="contained" onClick={handleDisagree}>Cancel</Button>
          <LoadingButton loading={loading} color='error' variant="contained" onClick={handleAgree}>Delete</LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
