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
    const [todo, setTodo] = useState()
    const [page, setPage] = useState(0)
    const [totalTodo, setTotalTodo] = useState()
    const [TableLoading, setTableLoading] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortingElement, setSortingElement] = useState("createdAt")
    const [sortingOrder, setSortingOrder] = useState("-1")
    // useEffect(() => {
    //     if (session) {
    //         getAllTodoData()

    //     }

    // }, [])




    useEffect(() => {
        setTimeout(() => {
            closeMessage()
        }, 2500);
    }, [message])
    const closeMessage = () => {
        setMessage("")
    }
    async function getAllTodoData() {

        setTableLoading(true)

        const url = `/api/todo/?id=${session?.user?.id}&limit=${rowsPerPage}&page=${page}&sortingElement=${sortingElement}&sortingOrder=${sortingOrder}`
        const res = await fetch(url, { cache: "no-cache" });

        if (res.ok) {


            const total = await fetch(`/api/totalTodo?id=${session?.user?.id} `, { cache: "no-cache" })
            setTotalTodo(await total.json())
            setTodo(await res.json());
            setTableLoading(false)

        }



    }
    useEffect(() => {



        if (session) {
            getAllTodoData()

        }

    }, [sortingOrder, sortingElement, page, rowsPerPage, session])

    const handlePage = async (e, newPage) => {

        await setPage(newPage);




    };
    const handleChangeRowsPerPage = async (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);



    };

    const handleSubmit = () => {
        setMessage("Added todo succesfully")
        getAllTodoData()
        setIsOpen(false);
        return



    };











    return (
        <>

            <Message message={message} onClose={closeMessage} />
            <main className="min-h-fit mt-24">


                <div className="px-12 mt-7 flex flex-col  space-y-5  ">
                    <h1 className="flex text-3xl font-semibold">Your Todo List</h1>


                    {todo && <div >
                        <div className='fixed right-25 bottom-25 z-50  '>

                            <FloatButton style={{
                                right: 94,
                                bottom: 94,

                            }}
                                type="primary"

                                tooltip={<div>Create</div>} onClick={() => setIsOpen(true)} icon={<PlusOutlined />} />


                        </div>
                        <Modal open={isOpen} onCancel={() => setIsOpen(false)} footer={null} destroyOnClose maskClosable={false} >
                            <AddTodo task={"Create"} id={session?.user?.id} onSubmit={handleSubmit} />

                        </Modal>




                        {todo &&

                            < TodoItem data={todo} setMessage={setMessage} setSortingElement={setSortingElement} sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} loading={TableLoading} setLoading={setTableLoading} getAllTodoData={getAllTodoData} className="mb-5" />

                        }
                    </div>}
                    {todo && <div className='fixed  bottom-0 left-0 right-0 bg-white z-50'>
                        <div className='flex justify-center'>
                            <TablePagination
                                component="div"
                                count={totalTodo}
                                page={page}
                                onPageChange={handlePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                rowsPerPageOptions={[5, 10, 20, 50, 75, 100]}
                            />
                        </div>
                    </div>}


                    {!todo &&
                        <Skeleton />}


                </div>
            </main >
        </>

    );
}