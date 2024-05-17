"use client"
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';


import React, { useState } from 'react'
import DeleteNote from './Dialouge'
import { Button, Modal } from 'antd'

export default function note({ note, id, date, getSingleTodoData }) {
    const [openMainNote, setOpenMainNote] = useState(true)
    const [openUpdateNote, setOpenUpdateNote] = useState(false)
    const [note2, setNote2] = useState(note)
    const [focus, setFocus] = useState(note)
    const [noteUpdate, setNoteUpdate] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const deleteNote = async () => {
        const resp = await fetch(`/api/note`, {
            // Using method DELETE to delete data
            method: 'DELETE',
            body: JSON.stringify({
                'id': id
            })
        })
        getSingleTodoData()
    }
    const handleUpdate = () => {
        setOpenMainNote(false)
        setOpenUpdateNote(true)
    }

    const updateNote = async () => {
        setNoteUpdate(true)

        const updatedNote = await fetch('/api/note', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({

                description: note2, id,

            }),
        });
        getSingleTodoData()
        setOpenMainNote(true)
        setNoteUpdate(false)
        setOpenUpdateNote(false)

    }

    return (
        <div className={``}>
            {openMainNote && <div className={` bg-green-300 border border-green-700 p-1 m-2`}>

                <div className='flex justify-between  '>
                    <div className=' w-40 '>
                        <p>{note.length > 28 ? `${note.slice(0, 28)}...` : note}</p>

                    </div>

                    <div className="flex flex-row-reverse">

                        <button className="mx-6  " onClick={() => setIsDeleteOpen(true)}  >
                            <DeleteOutlined style={{ fontSize: '22px' }} />
                        </button>

                        <Modal centered open={isDeleteOpen} onCancel={() => setIsDeleteOpen(false)} footer={null} maskClosable={false} mask={true} closeIcon={false} width={"fit_content"} >
                            <DeleteNote id={id} task={"Note"} deleteTodo={deleteNote} Deleted={() => { }} isDeleteOpen={isDeleteOpen} setIsDeleteOpen={setIsDeleteOpen} />
                        </Modal>


                        <button onClick={handleUpdate}><EditOutlined style={{ fontSize: '22px' }} /></button>





                    </div>


                </div>
                <div className='flex justify-around'>

                    <p className='text-center text-sm '>Created on :{date.slice(0, 10)}    </p>
                </div>
            </div>}
            {openUpdateNote && <div className={` flex justify-between bg-green-300 border border-green-700 p-1 m-2`}>
                <div className='flex w-40 '>
                    <input autoFocus={focus} className='bg-green-300 px-1' type='text' value={note2} onChange={(e) => { setNote2(e.target.value) }} />
                </div>

                <Button loading={noteUpdate} disabled={noteUpdate} type="primary" className='  border-gray-600 rounded-md  text-green-50 m-1 p-1' onClick={updateNote}>Update</Button>

            </div>}
        </div>
    )
}
