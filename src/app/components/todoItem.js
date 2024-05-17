"use client"

import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import AddTodo from "./addTodo"
import { useState } from "react";
import DeleteTodo from "../components/Dialouge"
import { ConfigProvider, Modal, Table, Tag } from 'antd';
const { Column } = Table;


export default function todoItem({ data, setMessage, setSortingElement, setSortingOrder, loading, setLoading, getAllTodoData }) {

    const [isOpen, setIsOpen] = useState(false)
    const [id, setId] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)





    let Deleted = () => setMessage("Deleted Todo Successfully")



    const handleSubmit = () => {
        setMessage("")
        setIsOpen(false);
        setLoading(true)
        getAllTodoData()
        setMessage("Successfully updated Todo")

    };



    const deleteTodo = async (id) => {
        setMessage("")
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
        getAllTodoData()
        setIsDeleteOpen(false)
    }

    const idDelete = (id) => {
        setIsDeleteOpen(true)
        setId(id)
    }
    const idUpdate = (id) => {
        setIsOpen(true)
        setId(id)
    }
    const handleChange = (pagination, filters, sorter) => {
        console.log({ pagination, filters, sorter })
        setSortingElement(sorter.field)
        setSortingOrder(sorter.order == "ascend" ? "1" : "-1")
    }


    return (
        <>
            <Table dataSource={data} pagination={false} className="-z-50 " loading={loading} on onChange={handleChange} rowKey={obj => obj._id} >

                <Column title="Title" dataIndex="title" render={(title) => (
                    <div className=" text-base  font-medium">
                        {title.length > 20 ? `${title.slice(0, 20)} ....` : title}
                    </div>
                )} />
                <Column title="Description" dataIndex="description" render={(description) => (
                    <>
                        {description.length > 40 ? `${description.slice(0, 40)} ....` : description}
                    </>
                )} />
                <Column title="Expiry" dataIndex="expiry" render={(expiry) => (
                    <>
                        {`${expiry} days remaing`}
                    </>
                )} />
                <Column
                    title="Status"
                    dataIndex="status"


                    render={(status) => (



                        <Tag color={status == 'Active' ? "green" : status == 'Done' ? "blue" : "gray"}>
                            {status}
                        </Tag>



                    )}
                />
                <Column
                    title="priority"
                    dataIndex="priority"

                    render={(priority) => (

                        <Tag color={priority == 'High' ? "red" : priority == 'Low' ? "yellow" : "orange"}>
                            {priority}
                        </Tag>



                    )}
                />
                <Column
                    title="Action"
                    dataIndex={""}

                    render={(_, record) => (
                        <div className="flex justify-around">



                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorBgMask: "rgba(0, 0, 0, 0.15)",


                                    },
                                }}
                            >
                                <button className="mx-1" onClick={() => { idUpdate(record._id) }}><EditOutlined style={{ fontSize: "25px" }} /></button>



                                <button className="mx-1" onClick={() => { idDelete(record._id) }}><DeleteOutlined style={{ fontSize: "25px" }} /></button>


                            </ConfigProvider>


                        </div>
                    )
                    }
                />
            </Table >
            <Modal open={isOpen} onCancel={() => setIsOpen(false)} footer={null} maskClosable={false} mask={true} destroyOnClose  >
                <AddTodo task={"Update"} id={id} onSubmit={handleSubmit} />

            </Modal>
            <Modal open={isDeleteOpen} onCancel={() => setIsDeleteOpen(false)} closeIcon={false} width={"fit_content"} footer={null} maskClosable={false} mask={true} centered destroyOnClose   >
                <DeleteTodo task={"Todo"} id={id} Deleted={Deleted} deleteTodo={deleteTodo} isDeleteOpen={isDeleteOpen} setIsDeleteOpen={setIsDeleteOpen} />

            </Modal>
        </>
    )
}