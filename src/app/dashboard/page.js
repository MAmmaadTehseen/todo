"use client"
import Modal from 'react-modal'
import AddTodo from "../components/addTodo"
import TodoItem from "../components/TodoItem"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Message from '../components/Alert';
import Skeleton from '../components/Skeleton';
import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { FloatButton } from 'antd';
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
    // setreload(!reload)
    useEffect(() => {
        setTimeout(() => {
            closeMessage()
            setLoading(!loading)
        }, 3000);
    }, [message])
    useEffect(() => {
        setTableLoading(true)
        async function fetchdata() {


            const url = `/api/todo/?id=${session?.user?.id}&limit=${rowsPerPage}&page=${page}&sortingElement=${sortingElement}&sortingOrder=${sortingOrder}`
            const res = await fetch(url, { cache: "no-cache" });
            if (res.ok) {


                setBlogs(await res.json());
                const total = await fetch(`/api/count?id=${session.user.id} `, { cache: "no-cache" })
                setCount(await total.json())
                setTableLoading(false)

            }



        }

        if (session) {
            fetchdata()
            setLoading(true)
        }

    }, [reload, session, message, sortingOrder, sortingElement])

    const handlePage = async (e, newPage) => {

        await setPage(newPage);
        setreload(!reload)
    };
    const handleChangeRowsPerPage = async (event) => {
        await setRowsPerPage(parseInt(event.target.value));
        await setPage(0);
        setreload(!reload)
    };

    const handleSubmit = () => {
        setLoading(!loading)
        setMessage("Added todo succesfully")
        setIsOpen(false);
        setreload(!reload)
        return



    };
    const closeMessage = () => {
        setreload(!reload)
        setMessage("")
    }







    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            alignItems: "center"
        },
        content: {
            // backgroundColor: 'rgba(0, 0, 0, 0.7)'
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
                        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
                            <AddTodo task={"Create"} id={null} onSubmit={handleSubmit} />
                            <button className='absolute top-5 right-5' onClick={() => setIsOpen(false)}><FontAwesomeIcon style={{ fontSize: "25px" }} icon={faXmark}></FontAwesomeIcon></button>
                        </Modal>




                        {blogs &&

                            < TodoItem data={blogs} setMessage={setMessage} setsortingElement={setsortingElement} sortingOrder={sortingOrder} setsortingOrder={setsortingOrder} loading={TableLoading} className="mb-5" />

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