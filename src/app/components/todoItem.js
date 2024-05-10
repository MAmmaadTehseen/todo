"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddTodo from "./addTodo"
import { faPenToSquare, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import DeleteTodo from "../components/Dialouge"
import { Table, Tag } from 'antd';
import Modal from 'react-modal'
const { Column } = Table;


export default function item({ data, setMessage, id }) {

    const [isOpen, setIsOpen] = useState(false)
    const [iid, setId] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)




    let Deleted = () => setMessage("Deleted Todo Successfully")



    const handleSubmit = () => {
        setMessage("")
        setIsOpen(false);
        setMessage("Successfully updated Todo")

    };



    const deleteTodo = async (id) => {
        setMessage("")
        console.log("id", id)
        const deletedTodo = await fetch('/api/todo', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({

                isDeleted: "true",
                id,

            }),
        });
        setIsOpenDelete(false)
        console.log(deletedTodo.json())
    }

    const idDelete = (iid) => {
        setIsOpenDelete(true)
        setId(iid)
    }
    const idUpdate = (iid) => {
        setIsOpen(true)
        setId(iid)
    }

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            alignItems: "center"
        },
        content: {
            backgroundColor: "white",
            maxWidth: "fit-content",
            height: "fit-content",
            top: "10%",
            left: "40%",
            border: "3px solid blue",
            borderRadius: "30px"

        }
    }

    return (
        <Table dataSource={data} pagination={false} className="z-5 "  >

            <Column title="Title" dataIndex="title" key="title" render={(title) => (
                <>
                    {title.length > 20 ? `${title.slice(0, 20)} ....` : title}
                </>
            )} />
            <Column title="Description" dataIndex="description" key="description" render={(description) => (
                <>
                    {description.length > 40 ? `${description.slice(0, 40)} ....` : description}
                </>
            )} />
            <Column title="Expiry" dataIndex="expiry" key="expiry" render={(expiry) => (
                <>
                    {`${expiry} days remaing`}
                </>
            )} />
            <Column
                title="Status"
                dataIndex="status"
                key="status"
                render={(status) => (



                    <Tag color={status == 'Active' ? "green" : status == 'Done' ? "blue" : "gray"}>
                        {status}
                    </Tag>



                )}
            />
            <Column
                title="priority"
                dataIndex="priority"
                key="priority"
                render={(priority) => (

                    <Tag color={priority == 'High' ? "red" : priority == 'Low' ? "yellow" : "orange"}>
                        {priority}
                    </Tag>



                )}
            />
            <Column
                title="Action"
                dataIndex={""}
                key={"action"}
                render={(_, record) => (
                    <div className="flex flex-row-reverse justify-around">

                        <button className="mx-1" onClick={() => { idDelete(record._id) }}><FontAwesomeIcon style={{ fontSize: "25px" }} icon={faTrashCan}></FontAwesomeIcon></button>
                        <Modal isOpen={isOpenDelete} onRequestClose={() => setIsOpenDelete(false)} style={customStyles}   >
                            <DeleteTodo task={"Todo"} id={iid} Deleted={Deleted} deleteTodo={deleteTodo} isOpenDelete={isOpenDelete} setIsOpenDelete={setIsOpenDelete} />

                        </Modal>

                        <button className="mx-1" onClick={() => { idUpdate(record._id) }}><FontAwesomeIcon style={{ fontSize: "25px" }} icon={faPenToSquare}></FontAwesomeIcon></button>
                        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
                            <AddTodo task={"Update"} id={iid} onSubmit={handleSubmit} />
                            <button className='absolute top-5 right-5' onClick={() => setIsOpen(false)}><FontAwesomeIcon style={{ fontSize: "25px" }} icon={faXmark}></FontAwesomeIcon></button>

                        </Modal>



                    </div>
                )}
            />
        </Table>
    )
}