"use client"
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LoadingButton } from '@mui/lab'
import React, { useState } from 'react'
import DeleteNote from './Dialouge'
import { Modal } from 'antd'

export default function note({ note, id, date, fetchdata }) {
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
        fetchdata()
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
        fetchdata()
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
                            <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faTrashCan}></FontAwesomeIcon>
                        </button>

                        <Modal centered open={isDeleteOpen} onCancel={() => setIsOpen(false)} footer={null} maskClosable={false} mask={true}  >
                            <DeleteNote id={id} task={"Note"} deleteTodo={deleteNote} Deleted={() => { }} isDeleteOpen={isDeleteOpen} setIsOpenDelete={setIsDeleteOpen} />
                        </Modal>


                        <button onClick={handleUpdate}><FontAwesomeIcon style={{ fontSize: "15px" }} icon={faPenToSquare}></FontAwesomeIcon></button>





                    </div>


                </div>
                <div className='flex justify-around'>

                    <p className='text-center text-sm '>Created on :{date.slice(0, 10)}    </p>
                    {/* <p className='text-center text-sm '>At: {date.slice(-13, -5)}    </p> */}
                </div>
            </div>}
            {openUpdateNote && <div className={` flex justify-between bg-green-300 border border-green-700 p-1 m-2`}>
                <div className='flex w-40 '>
                    <input autoFocus={focus} className='bg-green-300 px-1' type='text' value={note2} onChange={(e) => { setNote2(e.target.value) }} />
                </div>

                <LoadingButton loading={noteUpdate} disabled={noteUpdate} color='secondary' variant="contained" className='  border-gray-600 rounded-md  text-green-50 m-1 p-1' onClick={updateNote}>Update</LoadingButton>

            </div>}
        </div>
    )
}
