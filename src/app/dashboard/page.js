"use client"
import AddTodo from "../components/addTodo"
import TodoItem from "../components/todoItem"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Message from '../components/Alert';
import Skeleton from '../components/Skeleton';
import TablePagination from '@mui/material/TablePagination';
import { FloatButton, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


export default function Home() {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState("")
    const { data: session } = useSession()
    const [blogs, setBlogs] = useState()
    const [page, setPage] = useState(0)
    const [count, setCount] = useState()
    const [TableLoading, setTableLoading] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortingElement, setSortingElement] = useState("createdAt")
    const [sortingOrder, setSortingOrder] = useState("-1")
    useEffect(() => {
        if (session) {
            getAllTodoData()

        }

    }, [session])
    useEffect(() => {
        console.log("object")

        return () => {

        }
    }, [])


    // (() => { console.log("object") })

    useEffect(() => {
        setTimeout(() => {
            closeMessage()
        }, 2500);
    }, [message])
    const closeMessage = () => {
        setMessage("")
    }
    async function getAllTodoData() {


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
            getAllTodoData()

        }

    }, [sortingOrder, sortingElement, page, rowsPerPage])

    const handlePage = async (e, newPage) => {

        await setPage(newPage);
        setTableLoading(true)




    };
    const handleChangeRowsPerPage = async (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
        setTableLoading(true)



    };

    const handleSubmit = () => {
        setMessage("Added todo succesfully")
        setTableLoading(true)
        getAllTodoData()
        setIsOpen(false);
        return



    };











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
                        <Modal open={isOpen} onCancel={() => setIsOpen(false)} footer={null} destroyOnClose maskClosable={false} >
                            <AddTodo task={"Create"} id={null} onSubmit={handleSubmit} />

                        </Modal>




                        {blogs &&

                            < TodoItem data={blogs} setMessage={setMessage} setSortingElement={setSortingElement} sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} loading={TableLoading} setLoading={setTableLoading} getAllTodoData={getAllTodoData} className="mb-5" />

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
                                rowsPerPageOptions={[5, 10, 20, 50, 75, 100]}
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