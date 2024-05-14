"use client"
import { faL, faPenToSquare, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LoadingButton } from '@mui/lab'
import React, { useState } from 'react'
import DeleteNote from './Dialouge'
import { Modal } from 'antd'

export default function note({ note, id, date, fetchdata }) {
    const [openMain, setOpenMain] = useState(true)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [note2, setNote2] = useState(note)
    const [focus, setfocus] = useState(note)
    const [noteUpdate, setnoteUpdate] = useState(false)
    const [isOpenDelete, setisOpenDelete] = useState(false)

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
        setOpenMain(false)
        setOpenUpdate(true)
    }

    const updateNote = async () => {
        setnoteUpdate(true)

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
        setOpenMain(true)
        setnoteUpdate(false)
        setOpenUpdate(false)

    }
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            alignItems: "center"
        },
        content: {
            // backgroundColor: 'rgba(0, 0, 0, 0.7)'
            backgroundColor: "white",
            maxWidth: "fit-content",
            maxHeight: "fit-content",
            display: "",
            top: "15px",
            left: "40%",
            border: "3px solid blue",
            borderRadius: "30px"

        }
    }

    return (
        <div className={``}>
            {openMain && <div className={` bg-green-300 border border-green-700 p-1 m-2`}>

                <div className='flex justify-between  '>
                    <div className=' w-40 '>
                        <p>{note.length > 28 ? `${note.slice(0, 28)}...` : note}</p>

                    </div>

                    <div className="flex flex-row-reverse">

                        <button className="mx-6  " onClick={() => setisOpenDelete(true)}  >
                            <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faTrashCan}></FontAwesomeIcon>
                        </button>

                        <Modal centered open={isOpenDelete} onCancel={() => setIsOpen(false)} footer={null} maskClosable={false} mask={true}  >
                            <DeleteNote id={id} task={"Note"} deleteTodo={deleteNote} Deleted={() => { }} isOpenDelete={isOpenDelete} setIsOpenDelete={setisOpenDelete} />
                        </Modal>


                        <button onClick={handleUpdate}><FontAwesomeIcon style={{ fontSize: "15px" }} icon={faPenToSquare}></FontAwesomeIcon></button>





                    </div>


                </div>
                <div className='flex justify-around'>

                    <p className='text-center text-sm '>Created on :{date.slice(0, 10)}    </p>
                    {/* <p className='text-center text-sm '>At: {date.slice(-13, -5)}    </p> */}
                </div>
            </div>}
            {openUpdate && <div className={` flex justify-between bg-green-300 border border-green-700 p-1 m-2`}>
                <div className='flex w-40 '>
                    <input autoFocus={focus} className='bg-green-300 px-1' type='text' value={note2} onChange={(e) => { setNote2(e.target.value) }} />
                </div>

                <LoadingButton loading={noteUpdate} disabled={noteUpdate} color='secondary' variant="contained" className='  border-gray-600 rounded-md  text-green-50 m-1 p-1' onClick={updateNote}>Update</LoadingButton>

            </div>}
        </div>
    )
}
