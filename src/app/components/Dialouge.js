import * as React from 'react';
import Button from '@mui/material/Button';
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

    <div className='flex flex-col'>


      <div>

        Are you sure you want to delete that {task}?
      </div>
      <div className='flex flex-row-reverse'>

        <Button className='m-2' color='success' variant="contained" onClick={handleDisagree}>Cancel</Button>
        <LoadingButton className='m-2' loading={loading} color='error' variant="contained" onClick={handleAgree}>Delete</LoadingButton>
      </div>
    </div>

  );
}