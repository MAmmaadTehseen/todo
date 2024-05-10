"use client"
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Note from "./Note";
import { Backdrop, CircularProgress } from '@mui/material';
import { Spin } from 'antd';



export default function addTodo({ task, id, onSubmit }) {
    const { data: session } = useSession();
    const userId = session?.user?.id
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState()
    const [priority, setPriority] = useState()
    const [expiry, setExpiry] = useState()
    const [date, setDate] = useState(`${new Date().getYear()}-${new Date().getMonth()}-${new Date().getDate()}`)
    const [loading, setLoading] = useState(false)
    const [loadingData, setLoadingData] = useState(false)
    const [noteLoading, setNoteLoading] = useState(false)
    const [loadingAdd, setLoadingAdd] = useState(false)
    const [disable, setDisable] = useState(false)
    const [errorNote, setErrorNote] = useState("")
    const [error, setError] = useState("")
    const [notes, setNotes] = useState([])
    const [note, setNote] = useState(null)
    const [reload, setreload] = useState(true)


    let close = () => onSubmit()
    useEffect(() => {
        setTimeout(() => {
            setError("")
        }, 3000);
    }, [error])

    useEffect(() => {

        async function fetchdata() {

            const url = `/api/note/?id=${id}`
            const res = await fetch(url, { cache: "no-cache" })

            await res.json().then((res) => setNotes(res))
        }
        if (task == "Update") {
            fetchdata()
            notes ? setLoadingData(false) : setLoadingData(true)
            console.log("notes", notes)
        }





    }, [note, id])




    if (task === "Update") {
        useEffect(() => {

            setDisable(true)
            setLoadingData(true)
            async function fetchdata() {
                console.log("Update")


                const url = `/api/singleTodo/?id=${id}`
                const res = await fetch(url, { cache: "no-cache" });
                await res?.json().then((res) => {
                    setDisable(false)
                    setLoadingData(false)
                    setTitle(res.title)
                    setDescription(res.description)
                    setStatus(res.status)
                    setPriority(res.priority)
                    var tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + res.expiry);
                    let day = tomorrow.getDate()
                    let month = tomorrow.getMonth() + 1
                    let year = tomorrow.getYear() + 1900
                    setDate(`${year}-${month < 10 ? "0" + month : month}-${day < 9 ? "0" + day : day}`)
                    setExpiry(res.expiry)

                    if (!res) {
                        setError("loading failed")
                    }



                })

            }
            if (session) { fetchdata() }

        }, [id])
    }

    const createTodo = async (e) => {

        e.preventDefault();
        if (!title) {
            setError("Enter title")
            return
        }
        else if (!description) {
            setError("Enter description")
            return
        }
        else if (!status) {
            setError("Enter status")
            return
        }
        else if (!priority) {
            setError("Enter priority")
            return
        }
        else if (expiry <= 0) {
            setError("Previous date not Allowed")
            return
        }

        else if (!expiry) {
            setError("Select a date")
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
                        title,
                        description,
                        expiry,
                        priority,
                        status,
                        userId,

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

                        title, description, status, priority, expiry, id,

                    }),
                });
                console.log(updatedTodo)
            }







            close()
        } catch (error) {
            console.log(error);
        }


    };
    const handleDate = (e) => {
        setExpiry(Math.ceil(((new Date(e.target.value) - new Date()) / (24 * 60 * 60 * 1000))))
        console.log(expiry)

        setDate(e.target.value)

    }


    const addNote = async () => {
        setLoadingAdd(true)
        setNoteLoading(true)
        setErrorNote("")
        if (!note) {
            setNoteLoading(false)
            setErrorNote("Enter a note first")
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
        console.log(createdNote)
        setNote("")
        setreload(!reload)
        setLoadingAdd(false)
        setNoteLoading(false)
    }



    return (
        <div>


            <Spin spinning={loadingData}>
                <div className="min-w-full    bg-white ">

                    <div className="flex  flex-col   lg:px-8">
                        <div >
                            <h2 className=" text-center text-2xl font-bold  text-gray-900">Todo</h2>
                        </div>

                        <div className="mt-10 sm:mx-auto  sm:max-w-sm">

                            <div>
                                <label className="block text-lg font-medium  text-gray-900">Title</label>
                                <div className="my-2">
                                    <input value={title} onChange={(e) => { setTitle(e.target.value) }} className="w-full rounded-md border border-gray-400 py-1.5 text-gray-900 " placeholder=" Title" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-lg font-medium  text-gray-900">Description</label>
                                <div className="my-2">
                                    <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} rows="3" className="w-full rounded-md border border-gray-400 py-1.5 text-gray-900 " placeholder=" Add a brief description of your task"></textarea>
                                </div>
                            </div>


                            <div className="flex justify-around">
                                <div className="my-2">

                                    <label className=" mb-2 block  text-lg font-medium leading-6 text-gray-900">Status</label>

                                    <select value={status} onChange={(e) => { setStatus(e.target.value) }} className=" w-full rounded-md border border-gray-400 py-1.5 text-gray-900 bg-white ">
                                        <option disabled selected > -- select an option -- </option>
                                        <option value="Active">Active</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Done">Done</option>
                                    </select>

                                </div>
                                <div className="m-2">

                                    <label forhtml="country" className="block mb-2 text-lg font-medium leading-6 text-gray-900">Priority</label>

                                    <select value={priority} onChange={(e) => { setPriority(e.target.value) }} className="w-full rounded-md border border-gray-400 py-1.5 text-gray-900 bg-white ">
                                        <option disabled selected value> -- select an option -- </option>
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
                    {notes && <div className="relative border-t-4 border-dotted border-gray-600 m-2">
                        <h1 className="inline font-bold text-pretty border-b-4 border-double border-stone-600 text-lg">Notes</h1>
                        <div className="my-2">
                            <textarea rows={1} value={note} onChange={(e) => { setNote(e.target.value) }} className=" rounded-md border border-gray-400 py-1.5 text-gray-900 " placeholder=" Add your Note" />
                        </div>
                        {errorNote && <div className=" border border-red-600 rounded-md w-fit mt-1    px-3">{errorNote}</div>}
                        <LoadingButton loading={loadingAdd} disabled={loadingAdd} color='primary' variant='contained' className='absolute top-8 right-0 border rounded-md w-fit p-1 m-1' onClick={addNote} >Add Note</LoadingButton>
                        <div className="mt-4 mx-2">
                            {notes.map(blog => (
                                <div key={blog._id}  >



                                    <div>
                                        <Note note={blog.description} date={blog.createdAt} id={blog._id} />

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>}
                </div>
            </Spin>
        </div>
    )
}