"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddTodo from "./addTodo"
import { faPenToSquare, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import DeleteTodo from "../components/Dialouge"
import { ConfigProvider, Modal, Table, Tag } from 'antd';
const { Column } = Table;


export default function item({ data, setMessage, id, setsortingElement, setsortingOrder, loading, setLoading, fetchdata }) {

    const [isOpen, setIsOpen] = useState(false)
    const [iid, setId] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)





    let Deleted = () => setMessage("Deleted Todo Successfully")



    const handleSubmit = () => {
        setMessage("")
        setIsOpen(false);
        setLoading(true)
        fetchdata()
        setMessage("Successfully updated Todo")

    };



    const deleteTodo = async (id) => {
        setMessage("")
        console.log("id", id)
        setLoading(true)
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
        fetchdata()
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
        console.log("open update")
    }

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            alignItems: "center"
        },
        content: {
            backgroundColor: "white",
            maxWidth: "fit-content",
            height: "fit-content",
            top: "10%",
            left: "40%",
            border: "3px solid white",
            borderRadius: "30px",


        }
    }
    const sort = (order) => {
        if (order == "ascend") {
            setsortingOrder(1)

        }
        else if (order == "descend") {
            setsortingOrder(-1)

        }
        else {
            setsortingOrder(1)
            setsortingElement("createdAt")
        }
    }

    return (
        <>
            <Table dataSource={data} pagination={false} className="-z-50 " loading={loading} >

                <Column title="Title" dataIndex="title" key="title" sorter={(a, b, order = "abc") => { console.log(order); setsortingElement("title"); sort(order); }} render={(title) => (
                    <>
                        {title.length > 20 ? `${title.slice(0, 20)} ....` : title}
                    </>
                )} />
                <Column title="Description" dataIndex="description" key="description" render={(description) => (
                    <>
                        {description.length > 40 ? `${description.slice(0, 40)} ....` : description}
                    </>
                )} />
                <Column title="Expiry" dataIndex="expiry" key="expiry" sorter={(a, b, order) => { setsortingElement("expiry"); sort(order); }} render={(expiry) => (
                    <>
                        {`${expiry} days remaing`}
                    </>
                )} />
                <Column
                    title="Status"
                    dataIndex="status"
                    key="status"
                    sorter={(a, b, order) => { setsortingElement("status"); sort(order); }}
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
                    sorter={(a, b, order) => { setsortingElement("priority"); sort(order); }}
                    render={(priority) => (

                        <Tag color={priority == 'High' ? "red" : priority == 'Low' ? "yellow" : "orange"}>
                            {priority}
                        </Tag>



                    )}
                />
                <Column
                    title="Action"
                    dataIndex={""}
                    key="action"

                    render={(_, record) => (
                        <div className="flex justify-around">



                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorBgMask: "rgba(0, 0, 0, 0.15)",


                                    },
                                }}
                            >
                                <button className="mx-1" onClick={() => { idUpdate(record._id) }}><FontAwesomeIcon style={{ fontSize: "25px" }} icon={faPenToSquare}></FontAwesomeIcon></button>



                                <button className="mx-1" onClick={() => { idDelete(record._id) }}><FontAwesomeIcon style={{ fontSize: "25px" }} icon={faTrashCan}></FontAwesomeIcon></button>


                            </ConfigProvider>


                        </div>
                    )
                    }
                />
            </Table >
            <Modal open={isOpen} onCancel={() => setIsOpen(false)} footer={null} maskClosable={false} mask={true} destroyOnClose  >
                <AddTodo task={"Update"} id={iid} onSubmit={handleSubmit} />

            </Modal>
            <Modal open={isOpenDelete} onCancel={() => setIsOpenDelete(false)} footer={null} maskClosable={false} mask={true} centered   >
                <DeleteTodo task={"Todo"} id={iid} Deleted={Deleted} deleteTodo={deleteTodo} isOpenDelete={isOpenDelete} setIsOpenDelete={setIsOpenDelete} />

            </Modal>
        </>
    )
}