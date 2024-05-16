"use client"
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Note from "./Note";
import { Spin } from 'antd';



export default function addTodo({ task, id, onSubmit }) {
    const { data: session } = useSession();
    const userId = session?.user?.id

    const [todo, setTodo] = useState({
        title: "",
        description: "",
        status: null,
        priority: null,
        expiry: 0,
    })
    const [date, setDate] = useState(`${new Date().getYear()}-${new Date().getMonth()}-${new Date().getDate()}`)
    const [loading, setLoading] = useState(false)
    const [loadingData, setLoadingData] = useState(false)
    const [loadingAdd, setLoadingAdd] = useState(false)
    const [disable, setDisable] = useState(false)
    const [errorNote, setErrorNote] = useState("")
    const [error, setError] = useState("")
    const [notes, setNotes] = useState({
        description: "",
        createdAt: ""
    })
    const [note, setNote] = useState(null)
    const [reload, setReload] = useState(true)


    let close = () => onSubmit()
    useEffect(() => {
        setTimeout(() => {
            setError("")
        }, 3000);
    }, [error])



    async function getSingleTodoData() {


        const url = `/api/singleTodo/?id=${id}`
        const res = await fetch(url, { cache: "no-cache" });
        await res.json().then((res) => {

            setDisable(false)
            setTodo(res)
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + res.expiry);

            let day = tomorrow.getDate()
            let month = tomorrow.getMonth() + 1
            let year = tomorrow.getYear() + 1900
            setDate(`${year}-${month < 10 ? "0" + month : month}-${day < 9 ? "0" + day : day}`)
            if (!res) {
                setError("loading failed")
            }


            setNotes(res.notes)

            setLoadingData(false)
        })

    }


    useEffect(() => {


        if (task === "Update") {
            setDisable(true)
            setLoadingData(true)

            getSingleTodoData()



        }



    }, [])


    const createTodo = async (e) => {

        e.preventDefault();
        if (!todo.title) {
            setError("Enter title")
            return
        }
        else if (!todo.description) {
            setError("Enter description")
            return
        }
        else if (!todo.status) {
            setError("Enter status")
            return
        }
        else if (!todo.priority) {
            setError("Enter priority")
            return
        }
        else if (!todo.expiry) {
            setError("Select a date")
            return
        }
        else if (todo.expiry <= 0) {
            setError("Previous date not Allowed")
            return
        }


        setLoading(true)


        try {
            if (task === "Create") {

                const createdTodo = await fetch('/api/todo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({
                        title: todo.title,
                        description: todo.description,
                        expiry: todo.expiry,
                        priority: todo.priority,
                        status: todo.status,
                        userId: userId,

                    }),
                });


            }
            else if (task === "Update") {
                const updatedTodo = await fetch('/api/todo', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({

                        title: todo.title, description: todo.description, status: todo.status, priority: todo.priority, expiry: todo.expiry, id,

                    }),
                });
                if (updatedTodo.status == 500) {
                    setError("cannot update")
                    setLoading(false)
                    return
                }
            }







            setLoading(false)
            close()
        } catch (error) {
            console.log(error);
        }


    };
    const handleDate = (e) => {
        setTodo(todo => ({ ...todo, expiry: Math.ceil(((new Date(e.target.value) - new Date()) / (24 * 60 * 60 * 1000))) }))

        setDate(e.target.value)

    }


    const addNote = async () => {
        setLoadingAdd(true)
        setErrorNote("")
        if (!note) {
            setErrorNote("Enter a note first")
            setLoadingAdd(false)
            return
        }
        const createdNote = await fetch('/api/note', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({

                description: note, todoId: id,

            }),
        });
        setNote("")
        setReload(!reload)
        setLoadingAdd(false)
        getSingleTodoData()
    }



    return (
        <Spin spinning={loadingData}>
            <div>


                <div className="min-w-full     bg-white ">

                    <div className="flex  flex-col   lg:px-8">
                        <div >
                            <h2 className=" text-center text-2xl font-bold  text-gray-900">Todo</h2>
                        </div>

                        <div className="mt-10 sm:mx-auto  sm:max-w-sm">

                            <div>
                                <label className="block text-lg font-medium  text-gray-900">Title</label>
                                <div className="my-2">
                                    <input value={todo.title ? todo.title : ""} onChange={(e) => { setTodo(todo => ({ ...todo, title: e.target.value })) }} className="w-full rounded-md border border-gray-400 py-1.5 text-gray-900 " placeholder=" Title" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-lg font-medium  text-gray-900">Description</label>
                                <div className="my-2">
                                    <textarea value={todo.description ? todo.description : ""} onChange={(e) => { setTodo(todo => ({ ...todo, description: e.target.value })) }} rows="3" className="w-full rounded-md border border-gray-400 py-1.5 text-gray-900 " placeholder=" Add a brief description of your task"></textarea>
                                </div>
                            </div>


                            <div className="flex justify-around">
                                <div className="my-2">

                                    <label className=" mb-2 block  text-lg font-medium leading-6 text-gray-900">Status</label>

                                    <select value={todo.status ? todo.status : ""} onChange={(e) => { setTodo(todo => ({ ...todo, status: e.target.value })) }} className=" w-full rounded-md border border-gray-400 py-1.5 text-gray-900 bg-white ">
                                        <option disabled value="" > -- select an option -- </option>
                                        <option value="Active">Active</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Done">Done</option>
                                    </select>

                                </div>
                                <div className="m-2">

                                    <label forhtml="country" className="block mb-2 text-lg font-medium leading-6 text-gray-900">Priority</label>

                                    <select value={todo.priority ? todo.priority : ""} onChange={(e) => { setTodo(todo => ({ ...todo, priority: e.target.value })) }} className="w-full rounded-md border border-gray-400 py-1.5 text-gray-900 bg-white ">
                                        <option disabled value=""> -- select an option -- </option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>

                                </div>
                            </div>

                            <div className=" my-2" >

                                <label className="block text-lg font-medium leading-6 text-gray-900" >Expiry:</label>
                                <input type="date" value={date} onChange={handleDate} className=" rounded-md border border-gray-400 py-1.5 text-gray-900 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6 " ></input>
                            </div>
                            {error && <div className="bg-red-300 border border-red-600 rounded-md w-fit px-3">{error}</div>}

                            <div>



                                <LoadingButton color={disable ? "secondary" : "primary"} variant="contained" onClick={createTodo} type="submit"

                                    loading={loading}
                                    disabled={disable}
                                >{task}
                                </LoadingButton>
                            </div>

                        </div>
                    </div>
                </div>
                <div className=' w-full'>
                    {task == "Update" && <div className="relative border-t-4 border-dotted border-gray-600 m-2">
                        <h1 className="inline font-bold text-pretty border-b-4 border-double border-stone-600 text-lg">Notes</h1>
                        <div className="my-2">
                            <textarea rows={1} value={note} onChange={(e) => { setNote(e.target.value) }} className=" rounded-md border border-gray-400 py-1.5 text-gray-900 " placeholder=" Add your Note" />
                        </div>
                        {errorNote && <div className=" border border-red-600 rounded-md w-fit mt-1    px-3">{errorNote}</div>}
                        <LoadingButton loading={loadingAdd} disabled={loadingAdd} color='primary' variant='contained' className='absolute top-8 right-0 border rounded-md w-fit p-1 m-1' onClick={addNote} >Add Note</LoadingButton>
                        {notes != [] && todo.description != "" && <div className="mt-4 mx-2 flex flex-col-reverse">
                            {notes.map(blog => (
                                <div key={blog._id}  >



                                    <div>
                                        <Note note={blog.description} date={blog.createdAt} id={blog._id} getSingleTodoData={getSingleTodoData} />

                                    </div>
                                </div>
                            ))}
                        </div>}
                    </div>}
                </div>
            </div>
        </Spin >
    )
}