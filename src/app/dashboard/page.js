"use client"
import Modal from 'react-modal'
import AddTodo from "../components/addTodo"
import TodoItem from "../components/todoItem"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import Message from '../components/message';

export default function Home() {
    let bg = true
    const [isOpen, setIsOpen] = useState(false)
    const [message, setmessage] = useState("")
    const { data: session } = useSession()
    const [blogs, setblogs] = useState([])
    const [loading, setLoading] = useState()
    const [showComponent, setShowComponent] = useState()

    useEffect(() => {
        setTimeout(() => {
            closeMessage()
        }, 3000);
    }, [message])
    const handleSubmit = () => {
        setmessage("Added todo succesfully")
        setIsOpen(false);



    };
    const closeMessage = () => {
        setmessage("")
    }


    useEffect(() => {
        async function fetchdata() {


            const url = `/api/todo/?id=${session?.user?.id}`
            const res = await fetch(url, { cache: "no-cache" });
            setblogs(await res.json());


        }

        if (session) {
            fetchdata()
            setLoading(true)
        }

    })




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
        <>
            <Message message={message} onClose={closeMessage} />
            <main className="min-h-screen mt-20">


                <div className="px-12 mt-7 flex flex-col  space-y-5  ">
                    <h1 className="flex text-3xl font-semibold">Your Todo List</h1>

                    <div className="mt-5 grid border-b-8 border-blue-950 w-full grid-cols-8   font-bold   ">
                        <div className="">Title</div>
                        <div className="col-span-3">Description</div>
                        <div className="">Expires</div>
                        <div className="">Status</div>
                        <div className="">Priority</div>

                        <div className=" ">

                        </div>
                    </div>


                    <button className='fixed right-20 bottom-20 border bg-green-600  rounded-full h-10 w-10' onClick={() => setIsOpen(true)}><FontAwesomeIcon style={{ fontSize: "25px" }} icon={faPlus}></FontAwesomeIcon></button>
                    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
                        <AddTodo task={"Create"} id={null} onSubmit={handleSubmit} />
                        <button className='absolute top-5 right-5' onClick={() => setIsOpen(false)}><FontAwesomeIcon style={{ fontSize: "25px" }} icon={faXmark}></FontAwesomeIcon></button>
                    </Modal>

                    <div className="">

                        {blogs.map(blog => (
                            <div key={blog._id}  >

                                <TodoItem title={blog.title} setmessage={setmessage} id={blog._id} description={blog.description} date={blog.expiry} status={blog.status} priority={blog.priority} background={bg ? bg = false : bg = true} />


                            </div>
                        ))}
                    </div>


                </div>
            </main >
        </>

    );
}