
"use client"
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from 'react-modal'
import AddTodo from "../components/addTodo"
import { faPenToSquare, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import Message from "./message";
import { useState } from "react";

export default function item({ title, description, date, status, priority, background, id, onSubmit }) {

    const [isOpen, setIsOpen] = useState(false)
    const [message, setmessage] = useState("")
    let Deleted = () => setmessage("Deleted Todo Successfully")

    const handleSubmit = () => {
        setIsOpen(false);
        setmessage("Successfully updated Todo")

    };

    const closeMessage = () => {
        setmessage("")
    }


    const deleteTodo = async () => {
        const resp = await fetch(`/api/todo`, {
            // Using method DELETE to delete data
            method: 'DELETE',
            body: JSON.stringify({
                '_id': id
            })
        })




        Deleted()


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
            top: "25px",
            left: "40%",
            border: "3px solid blue",
            borderRadius: "30px"

        }
    }


    return (
        <div className={`grid grid-cols-8 ${background == true ? "bg-gray-300" : ""}  border-2 border-cyan-700 rounded-lg w-full   p-2 mb-3`}>
            <Message message={message} onClose={closeMessage} />
            <div className="ml-2 w-10"><strong>{title.length <= 12 ? title : title.slice(0, 12) + "..."}</strong></div>
            <div className="col-span-3 ">{description.length < 40 ? description : description.slice(0, 40) + "...."}</div>
            <div className="">{date} days remaining</div>
            <div className={`border rounded-lg text-center h-7 w-20   ${status == 'Active' ? "bg-green-600" : status == 'Done' ? "bg-blue-600" : "bg-gray-600"} `}>{status}</div>
            <div className={`${priority == 'High' ? "bg-red-600" : priority == 'Low' ? "bg-yellow-600" : "bg-orange-600"} h-7 w-20 border rounded-lg text-center `}>{priority}</div>

            <div className="flex flex-row-reverse">

                <button className="mx-6  " onClick={deleteTodo} >
                    <FontAwesomeIcon style={{ fontSize: "25px" }} icon={faTrashCan}></FontAwesomeIcon>
                </button>
                <button onClick={() => setIsOpen(true)}><FontAwesomeIcon style={{ fontSize: "25px" }} icon={faPenToSquare}></FontAwesomeIcon></button>
                <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
                    <AddTodo task={"Update"} id={id} onSubmit={handleSubmit} />
                    <button className='absolute top-5 right-5' onClick={() => setIsOpen(false)}><FontAwesomeIcon style={{ fontSize: "25px" }} icon={faXmark}></FontAwesomeIcon></button>
                </Modal>



            </div>

        </div>
    )
}