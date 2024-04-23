"use client"
import { Button } from "@nextui-org/react";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";


export default function addTodo({ task, id, onSubmit }) {
    const { data: session } = useSession();
    const userId = session?.user?.id
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState()
    const [priority, setPriority] = useState()
    const [expiry, setExpiry] = useState()
    const [loading, setLoading] = useState(false)
    const [disable, setDisable] = useState(false)
    const [error, setError] = useState("")
    let close = () => onSubmit()



    if (task === "Update") {
        useEffect(() => {

            setDisable(true)
            async function fetchdata() {
                console.log("Update")


                const url = `/api/singleTodo/?id=${id}`
                const res = await fetch(url, { cache: "no-cache" });
                await res?.json().then((res) => {
                    setDisable(false)
                    console.log("res", res)
                    setTitle(res.title)
                    setDescription(res.description)
                    setStatus(res.status)
                    setPriority(res.priority)
                    setExpiry(res.expiry)
                    if (!res) {
                        setError("loading failed")
                    }



                })

            }

            fetchdata()

        }, [])
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
                console.log("add")
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
                console.log("updatedTodo.json()")
            }







            close()
        } catch (error) {
            console.log(error);
        }


    };


    return (
        <div className="">

            <div className="min-w-full  min-h-full bg-white ">

                <div className="flex  flex-col   lg:px-8">
                    <div >
                        <h2 className=" text-center text-2xl font-bold  text-gray-900">Todo</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto  sm:max-w-sm">

                        <div>
                            <label className="block text-lg font-medium leading-6 text-gray-900">Title</label>
                            <div className="my-2">
                                <input value={title} onChange={(e) => { setTitle(e.target.value) }} className="w-full rounded-md border border-gray-400 py-1.5 text-gray-900 " placeholder=" Title" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-lg font-medium leading-6 text-gray-900">Description</label>
                            <div className="my-2">
                                <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} rows="3" className="w-full rounded-md border border-gray-400 py-1.5 text-gray-900 " placeholder=" Add a brief description of your task"></textarea>
                            </div>
                        </div>


                        <div className="flex justify-around">
                            <div className="my-2">

                                <label className=" my-2 block  text-lg font-medium leading-6 text-gray-900">Status</label>

                                <select value={status} onChange={(e) => { setStatus(e.target.value) }} className=" w-full rounded-md border border-gray-400 py-1.5 text-gray-900 ">
                                    <option disabled selected> -- select an option -- </option>
                                    <option value="Active">Active</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Done">Done</option>
                                </select>

                            </div>
                            <div className="m-2">

                                <label forhtml="country" className="block my-2 text-lg font-medium leading-6 text-gray-900">Priority</label>

                                <select value={priority} onChange={(e) => { setPriority(e.target.value) }} className="w-full rounded-md border border-gray-400 py-1.5 text-gray-900 ">
                                    <option disabled selected value> -- select an option -- </option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>

                            </div>
                        </div>

                        <div className=" my-2" >

                            <label className="block text-lg font-medium leading-6 text-gray-900" >Expiry:</label>
                            <input type="date" onChange={(e) => { setExpiry(Math.ceil(((new Date(e.target.value) - new Date()) / (24 * 60 * 60 * 1000)) + 1)) }} className=" rounded-md border border-gray-400 py-1.5 text-gray-900 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6 " ></input>
                        </div>
                        {error && <div className="bg-red-300 border border-red-600 rounded-md w-fit px-3">{error}</div>}

                        <div>



                            <Button onClick={createTodo} type="submit" className="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 "
                                isLoading={loading}
                                disabled={disable}
                                spinner={
                                    <svg
                                        className="animate-spin h-5 w-5 text-current"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                }
                            >
                                {!loading && task}
                            </Button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}