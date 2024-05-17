"use client"
import AddTodo from "../components/addTodo"
import TodoItem from "../components/todoItem"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Message from '../components/Alert';
import Skeleton from '../components/Skeleton';
import { FloatButton, Modal, Pagination } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { set } from "mongoose";


export default function dashboard() {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState("")
    const { data: session } = useSession()
    const [todo, setTodo] = useState()
    const [page, setPage] = useState(1)
    const [totalTodo, setTotalTodo] = useState()
    const [TableLoading, setTableLoading] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortingElement, setSortingElement] = useState("createdAt")
    const [sortingOrder, setSortingOrder] = useState("-1")
    let a = 0;
    let order = "-1";
    let element = "createdAt";

    let sort = (order1, element1) => {
        a = a + 1;
        order = order1 == "ascend" ? "1" : "-1";
        element = element1
        console.log(order, element, a)
        // getAllTodoData()

    }
    useEffect(() => {
        console.log("object")
        // setSortingElement(element)
        // setSortingOrder(order)
    }, [a])


    useEffect(() => {
        setTimeout(() => {
            closeMessage()
        }, 2500);
    }, [message])
    const closeMessage = () => {
        setMessage("")
    }
    async function getAllTodoData() {


        const url = `/api/todo/?id=${session?.user?.id}&limit=${rowsPerPage}&page=${page - 1}&sortingElement=${sortingElement}&sortingOrder=${sortingOrder}`
        const total = await fetch(`/api/totalTodo?id=${session?.user?.id} `, { cache: "no-cache" })
        setTotalTodo(await total.json())
        const res = await fetch(url, { cache: "no-cache" });
        setTodo(await res.json());
        setTableLoading(false)





    }
    useEffect(() => {



        if (session) {
            setTableLoading(true)
            getAllTodoData()

        }

    }, [sortingOrder, sortingElement, page, rowsPerPage, session])




    const handlePage = async (page, pageSize) => {

        await setPage(page);
        setRowsPerPage(pageSize)
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

                            < TodoItem data={todo} setMessage={setMessage} setSortingElement={setSortingElement} sortingOrder={sortingOrder} setSortingOrder={setSortingOrder} loading={TableLoading} sort={sort} setLoading={setTableLoading} getAllTodoData={getAllTodoData} className="mb-5" />

                        }
                    </div>}
                    {todo && <div className='fixed  bottom-0 left-0 right-0 bg-white z-50'>
                        <div className='flex justify-center p-3'>

                            <Pagination
                                total={totalTodo}
                                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                                PageSize={rowsPerPage}
                                onChange={handlePage}
                                Current={page}
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