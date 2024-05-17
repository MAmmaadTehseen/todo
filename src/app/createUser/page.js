"use client"
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "antd";



export default function create() {
    const { data: session } = useSession()
    const router = useRouter()
    const [register, setRegister] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [password2, setPassword2] = useState("")
    const [error, setError] = useState("");
    useEffect(() => {
        setTimeout(() => {
            setError("")
        }, 3000);
    }, [error])

    useEffect(() => {
        if (session) {
            const url = `dashboard`
            router.replace(url)
        }

    }, [session]);

    const createUser = async (e) => {
        setError("")
        e.preventDefault();
        if (user.name.split(" ").length < 2) {
            setError("please enter last and first name")
            return
        }
        if (user.password !== password2) {
            setError("Password does not match")
            return
        }
        if (user.password.length < 6) {
            setError("password must be 6 digits")
            return
        }

        setRegister(true)

        try {
            const createdUser = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    password: user.password,

                }),
            });
        } catch (error) {
            setError("Error")
        }
        const res = await signIn("credentials", {
            email: user.email,
            password: user.password,
            redirect: false,
        })
        if (res.error) {
            setError("Error")
            setRegister(false)
            return
        }



    };


    return (
        <div className="flex justify-center items-center h-screen">

            <div>
                <div className=" w-fit shadow-2xl border border-gray-300 rounded-xl mt-5 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-5 p-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your account </h2>
                    </div>

                    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                                <div className="mt-2">
                                    <input value={user.name} onChange={(e) => { setUser(user => ({ ...user, name: e.target.value })) }} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-graysetuser(user => ({ ...user, name: e.target.value }))-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input value={user.email} onChange={(e) => { setUser(user => ({ ...user, email: e.target.value })) }} type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>

                                </div>
                                <div className="mt-2">
                                    <input value={user.password} onChange={(e) => { setUser(user => ({ ...user, password: e.target.value })) }} type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>

                                </div>
                                <div className="mt-2">
                                    <input value={password2} onChange={(e) => { setPassword2(e.target.value) }} type="password" autoComplete="current-password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            {error && <div className="bg-red-300 border  rounded-md w-fit px-3">
                                {error}
                            </div>}
                            <div>

                                <Button onClick={createUser}
                                    type="primary"

                                    loading={register}


                                >
                                    Register
                                </Button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already have a account?
                            <Link href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" >Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}