import { Button } from 'antd';
import { useState } from 'react';



export default function AlertDialogSlide({ setIsDeleteOpen, deleteTodo, Deleted, id, task }) {
  const [loading, setLoading] = useState(false)

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

    <div className=' '>


      <div className='text-lg mb-4'>

        Are you sure you want to delete that {task}?
      </div>
      <div className='flex flex-row-reverse align-center'>

        <Button className='mx-2' loading={loading} type="primary" danger onClick={handleAgree}>Delete</Button>
        <Button className='mx-2' onClick={handleDisagree} type="primary" >Cancel</Button>
      </div>
    </div>

  );
}