"use client"
import AddTodo from "../components/addTodo"
import TodoItem from "../components/todoItem"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Message from '../components/Alert';
import Skeleton from '../components/Skeleton';
import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { FloatButton, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


export default function Home() {
    let bg = true
    const [reload, setreload] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState("")
    const { data: session } = useSession()
    const [blogs, setBlogs] = useState(false)
    const [page, setPage] = useState(0)
    const [count, setCount] = useState()
    const [loading, setLoading] = useState(true)
    const [TableLoading, setTableLoading] = useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [sortingElement, setsortingElement] = useState("createdAt")
    const [sortingOrder, setsortingOrder] = useState("-1")
    useEffect(() => {
        if (session) {
            fetchdata()

        }

    }, [session])
    useEffect(() => {
        setTimeout(() => {
            closeMessage()
        }, 4000);
    }, [message])
    const closeMessage = () => {
        setMessage("")
    }
    async function fetchdata() {


        const url = `/api/todo/?id=${session?.user?.id}&limit=${rowsPerPage}&page=${page}&sortingElement=${sortingElement}&sortingOrder=${sortingOrder}`
        const res = await fetch(url, { cache: "no-cache" });
        if (res.ok) {


            const total = await fetch(`/api/count?id=${session.user.id} `, { cache: "no-cache" })
            setCount(await total.json())
            setBlogs(await res.json());
            setTableLoading(false)

        }



    }
    useEffect(() => {



        if (session) {
            setTableLoading(true)
            fetchdata()

        }

    }, [sortingOrder, sortingElement, page, rowsPerPage, loading])

    const handlePage = async (e, newPage) => {

        await setPage(newPage);
        setTableLoading(true)




    };
    const handleChangeRowsPerPage = async (event) => {
        await setRowsPerPage(parseInt(event.target.value));
        await setPage(0);
        setTableLoading(true)



    };

    const handleSubmit = () => {
        setMessage("Added todo succesfully")
        setTableLoading(true)
        fetchdata()
        setIsOpen(false);
        setreload(!reload)
        return



    };








    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
        <>

            <Message message={message} onClose={closeMessage} />
            <main className="min-h-fit mt-20">


                <div className="px-12 mt-7 flex flex-col  space-y-5  ">
                    <h1 className="flex text-3xl font-semibold">Your Todo List</h1>


                    {blogs && <div >
                        <div className='fixed right-25 bottom-25 z-50  '>

                            <FloatButton style={{
                                right: 94,
                                bottom: 94,

                            }}
                                type="primary"

                                tooltip={<div>Create</div>} onClick={() => setIsOpen(true)} icon={<PlusOutlined />} />


                        </div>
                        <Modal open={isOpen} onCancel={() => setIsOpen(false)} footer={null} >
                            <AddTodo task={"Create"} id={null} onSubmit={handleSubmit} />

                        </Modal>




                        {blogs &&

                            < TodoItem data={blogs} setMessage={setMessage} setsortingElement={setsortingElement} sortingOrder={sortingOrder} setsortingOrder={setsortingOrder} loading={TableLoading} setLoading={setTableLoading} fetchdata={fetchdata} className="mb-5" />

                        }
                    </div>}
                    {blogs && <div className='fixed  bottom-0 left-0 right-0 bg-white z-50'>
                        <div className='flex justify-center'>
                            <TablePagination
                                component="div"
                                count={count}
                                page={page}
                                onPageChange={handlePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                rowsPerPageOptions={[5, 10, 20, 50, 100]}
                            />
                        </div>
                    </div>}


                    {!blogs &&
                        <Skeleton />}


                </div>
            </main >
        </>

    );
}