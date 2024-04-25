"use client"
import { faPenToSquare, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Modal from 'react-modal'

export default function note({ note, id, date }) {
    const [openMain, setOpenMain] = useState(true)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [note2, setNote2] = useState(note)
    const [focus, setfocus] = useState(note)

    const deleteNote = async () => {
        const resp = await fetch(`/api/note`, {
            // Using method DELETE to delete data
            method: 'DELETE',
            body: JSON.stringify({
                'id': id
            })
        })
        console.log("delte")
    }
    const handleUpdate = () => {
        setOpenMain(false)
        setOpenUpdate(true)
    }

    const updateNote = async () => {


        const updatedNote = await fetch('/api/note', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({

                description: note2, id,

            }),
        });
        setOpenMain(true)
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

                        <button className="mx-6  "  >
                            <FontAwesomeIcon style={{ fontSize: "15px" }} onClick={deleteNote} icon={faTrashCan}></FontAwesomeIcon>
                        </button>

                        <button onClick={handleUpdate}><FontAwesomeIcon style={{ fontSize: "15px" }} icon={faPenToSquare}></FontAwesomeIcon></button>





                    </div>


                </div>
                <p className='text-center text-sm '>Created on :{date.slice(0, 10)}</p>
            </div>}
            {openUpdate && <div className={` flex justify-between bg-green-300 border border-green-700 p-1 m-2`}>
                <div className='flex w-40 '>
                    <input autoFocus={focus} className='bg-green-300 px-1' type='text' value={note2} onChange={(e) => { setNote2(e.target.value) }} />
                </div>

                <button className='bg-black border-gray-600 rounded-md text-green-50 m-1 p-1' onClick={updateNote}>Update</button>

            </div>}
        </div>
    )
}
