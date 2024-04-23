"use client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { AvatarComponent } from 'avatar-initials';




export default function profile() {
    const { data: session } = useSession()

    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(true);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [url, setUrl] = useState("")
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [error, setError] = useState("");
    const [initials, setinitials] = useState("AM")
    const [clicked, setClicked] = useState(true);
    useEffect(() => {
        let inint = (session?.user?.name)
        async function fetchdata() {
            setEmail(session?.user?.email)
            setName(session?.user?.name)
            setUrl(session?.user?.url)


        }

        if (session) {
            fetchdata()
            setDisable(false)
            inint = inint.split(" ")
            setinitials(`${inint[0][0]}${inint[1][0]}`)
            console.log(name)
        }

    }, [session])
    const createUser = async () => {

        setError()
        // if (url == "") {
        //     setError("Please Select an image first")
        //     return
        // }
        if (name.split(" ").length < 2) {
            setError("please enter last and first name")
            return
        }
        if (newPassword != password2) {
            setError("Password does not match")
            return
        }
        if (newPassword.length < 6) {
            setError("password must be 6 digits")
            return
        }




        setLoading(true)

        const updateUser = await fetch('/api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({

                id: session.user.id,
                name,
                email,
                url,
                password: newPassword,
                check: password,


            }),
        });
        console.log(newPassword)
        console.log(updateUser)
        setLoading(false)
        if (!updateUser) {
            setError("wrong password")
        }

    }

    return (
        <>
            {session &&
                <div>

                    <div className="flex flex-row justify-center mt-20">


                        <h1 className="font-bold text-2xl">
                            Welcome
                        </h1>
                        <h2 className="font-serif text-2xl text-blue-700"> {session.user.name}</h2>

                    </div>
                    <div className="flex justify-center">
                        <div className="flex  min-h-full shadow-2xl border border-gray-300 rounded-xl mt-5 flex-col justify-center px-6 py-12 lg:px-8">
                            <div className="flex flex-row justify-center items-center sm:mx-auto sm:w-full sm:max-w-sm">
                                <h2 className=" p-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Profile </h2>
                                <div className=" h-20 w-20 justify-center">
                                    <AvatarComponent
                                        classes="rounded-full"
                                        useGravatar={false}
                                        size={120}
                                        primarySource={session?.user?.url}
                                        color="#000000"
                                        background="#BFCA98"
                                        fontSize={60}


                                        fontWeight={400}
                                        offsetY={60}
                                        initials={initials}
                                    />

                                    {/* {!user?.url && <Image className="border rounded-full" src={session.user.url} fill={true} alt="profile photo" />} */}



                                </div>
                            </div>

                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form className="space-y-6" >
                                    <div>
                                        <label className="block text-sm font-medium leading-6 text-gray-900">Name :</label>
                                        <div className="mt-2">
                                            <input value={name} onChange={(e) => { setName(e.target.value) }} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium leading-6 text-gray-900">Email address :</label>
                                        <div className="mt-2">
                                            <input readOnly value={email} onChange={(e) => { setEmail(e.target.value) }} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>

                                    {clicked && <div>

                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label className="block text-sm font-medium leading-6 text-gray-900">Current Password</label>

                                            </div>
                                            <div className="mt-2">
                                                <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">New Password</label>

                                            </div>
                                            <div className="mt-2">
                                                <input value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Confirm New Password</label>

                                            </div>
                                            <div className="mt-2">
                                                <input value={password2} onChange={(e) => { setPassword2(e.target.value) }} type="password" autoComplete="current-password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>
                                    </div>}
                                    <div className="bg-red-300 border  rounded-md w-fit px-3">
                                        {error}
                                    </div>
                                    <div>

                                        <Button onClick={createUser} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                                            {!loading && <>Save Changes</>}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            }


        </>
    )


}
