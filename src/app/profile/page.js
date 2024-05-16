"use client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import GetImage from "../components/GetImage";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Avatar, Modal } from "antd";





export default function profile() {
    const { data: session } = useSession()

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("");
    const [userNameInitials, setUserNameInitials] = useState("AM")
    const [clicked, setClicked] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    useEffect(() => {
        setTimeout(() => {
            setError("")
        }, 3000);
    }, [error])
    const handleSubmit = () => {
        setIsOpen(false);
        setError("Image updated")
        getUserData()

    };
    // useEffect(() => {
    //     
    //     async function getUserData() {


    //     }

    //     if (session) {
    //         getUserData()
    //        

    //     }

    // }, [user])
    async function getUserData() {

        let inint = (session?.user?.name)
        inint = inint.split(" ")
        setUserNameInitials(`${inint[1][0]}${inint[2][0]}`)
        const url = `/api/singleUser/?id=${session?.user?.id}`
        const res = await fetch(url, { cache: "no-cache" });
        if (res.ok) { setUser(await res.json()); }




    }
    useEffect(() => {


        if (session) {
            getUserData()

        }

    }, [session])

    const updateUser = async () => {

        setError()

        if (user.name.split(" ").length < 2) {
            setError("please enter last and first name")
            return
        }

        if (clicked) {
            if (newPassword != confirmPassword) {
                setError("Password does not match")
                return
            }
            if (newPassword.length < 6) {
                setError("password must be 6 digits")
                return
            }
        }




        setLoading(true)

        const updateUser = await fetch('/api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({

                id: session.user.id,
                name: user.name,
                email: user.email,
                url: user.url,
                password: newPassword,
                check: password,


            }),
        });
        setLoading(false)
        if (updateUser.status == 400) {
            setError("wrong password")
            return
        }

        if (updateUser.status == 200) {
            setError("Updated")

        }

        setClicked(false)


    }
    const changePassword = (e) => {
        e.preventDefault()
        clicked ? setClicked(false) : setClicked(true)
    }


    return (
        <>
            {user &&
                <div>

                    <div className="flex flex-row justify-center mt-24">


                        <h1 className="font-bold  mr-2 text-2xl">
                            Welcome
                        </h1>
                        <h2 className="font-serif text-2xl text-blue-700"> {" " + user.name}</h2>

                    </div>
                    <div className="flex justify-center">
                        <div className="flex  min-h-full shadow-2xl border border-gray-300 rounded-xl mt-5 flex-col justify-center px-6 py-12 lg:px-8">
                            <div className="flex  justify-center items-center sm:mx-auto sm:w-full sm:max-w-sm">
                                <h2 className=" p-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Profile </h2>
                                <div className="flex justify-center">
                                    {user.name != "" &&
                                        <div className="relative h-20 w-20 justify-center">
                                            {!user.url && <Avatar size={80}>{userNameInitials.toUpperCase()}</Avatar>}


                                            {user?.url && <Avatar size={80} src={user.url}  ></Avatar>}

                                            <div className="my-2">
                                                <Button color="success" variant="contained" className="m-2" onClick={() => setIsOpen(true)}>Edit</Button>
                                                <Modal open={isOpen} onCancel={() => setIsOpen(false)} destroyOnClose footer={null} maskClosable={false} >
                                                    <GetImage onSubmit={handleSubmit} />

                                                </Modal>

                                            </div>
                                        </div>}

                                </div>

                            </div>

                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form className="space-y-6" >
                                    <div>
                                        <label className="block text-sm font-medium leading-6 text-gray-900">Name :</label>
                                        <div className="mt-2">
                                            <input value={user.name} onChange={(e) => { setUser(user => ({ ...user, name: e.target.value })) }} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium leading-6 text-gray-900">Email address :</label>
                                        <div className="mt-2">
                                            <input readOnly value={user.email} onChange={(e) => { setUser(user => ({ ...user, email: e.target.value })) }} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <LoadingButton size="small" color="success" variant="contained" onClick={changePassword}>Change Password</LoadingButton>

                                    {clicked && <div>

                                        <div>
                                            <label className="flex items-center justify-between">                                                <label className="block text-sm font-medium leading-6 text-gray-900">Current Password</label>

                                            </label>
                                            <div className="mt-2">
                                                <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" autoComplete="new-password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">New Password</label>

                                            </div>
                                            <div className="mt-2">
                                                <input value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} type="password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Confirm New Password</label>

                                            </div>
                                            <div className="mt-2">
                                                <input value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} type="password" autoComplete="new-password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>
                                    </div>}


                                    <div>

                                        <LoadingButton onClick={updateUser} color="success" variant="contained"
                                            loading={loading}

                                        >
                                            Save Changes
                                        </LoadingButton>
                                    </div>
                                    {error && <div className="bg-red-300 border  rounded-md w-fit px-3">
                                        {error}
                                    </div>}

                                </form>
                            </div>
                        </div>
                    </div >

                </div >
            }


        </>
    )


}
