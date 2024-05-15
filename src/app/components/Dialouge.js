import * as React from 'react';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';



export default function AlertDialogSlide({ setIsDeleteOpen, deleteTodo, Deleted, id, task }) {
  const [loading, setLoading] = React.useState(false)

  const handleAgree = async () => {
    setLoading(true)
    await deleteTodo(id)
    setIsDeleteOpen(false);
    Deleted()
    setLoading(false)
  };

  const handleDisagree = () => {
    setIsDeleteOpen(false);
  };

  return (

    <div className='flex flex-col'>


      <div>

        Are you sure you want to delete that {task}?
      </div>
      <div className='flex flex-row-reverse'>

        <LoadingButton className='m-2' loading={loading} color='error' variant="contained" onClick={handleAgree}>Delete</LoadingButton>
        <Button className='m-2' color='success' variant="contained" onClick={handleDisagree}>Cancel</Button>
      </div>
    </div>

  );
}