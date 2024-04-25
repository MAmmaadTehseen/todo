"use client"
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { AvatarComponent } from 'avatar-initials';
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import { useRouter } from "next/navigation";




export default function navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [umenu, setumenu] = useState("hidden");
    let { data: session } = useSession();
    const [initials, setinitials] = useState("AM")
    const [user, setUser] = useState(null)
    const [loading, setloading] = useState(false)
    const [profileLoading, setProfileloading] = useState(false)
    const [dashboardLoading, setDashboardloading] = useState(false)


    const handleSubmit = () => {
        setIsOpen(false);

    };


    useEffect(() => {
        let name = (session?.user?.name)
        async function fetchdata() {


            const url = `/api/singleUser/?id=${session?.user?.id}`
            const res = await fetch(url, { cache: "no-cache" });
            setUser(await res.json());


        }

        if (session) {
            fetchdata()
            name = name.split(" ")
            setinitials(`${name[0][0]}${name[1][0]}`)

        }

    })


    const signout = () => {
        setloading(true)
        signOut()
    }



    const router = useRouter()
    const handleProfile = () => {
        setumenu("")
        router.replace("profile")

    }
    const handleDashboard = () => {
        setumenu("")
        router.replace("dashboard")

    }



    return (
        <nav className="flex bg-blue-500 text-cyan-50 justify-between fixed left-0 right-0 top-0 ">
            <p className="flex text-5xl p-3 ">Todo</p>
            <div className="flex "> </div>
            <div className="flex ">

                {session &&
                    <div className="flex justify-center text-center">

                        <div className="relative ">
                            <div>
                                <button type="button" onClick={() => umenu == "hidden" ? setumenu("") : setumenu("hidden")} className="m-3 relative flex rounded-full bg-blue-500 text-sm focus:outline-none " >
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Open user menu</span>
                                    <div className=" flex justify-center">
                                        <AvatarComponent
                                            classes="rounded-full"
                                            useGravatar={false}
                                            size={44}
                                            // primarySource={}
                                            color="#000000"
                                            background="#BFCA98"
                                            fontSize={22}


                                            fontWeight={400}
                                            offsetY={24}
                                            initials={initials}
                                        />

                                        {user?.url && <Image className="border rounded-full" src={user.url} fill={true} alt="profile photo" />}



                                    </div>
                                </button>
                            </div>
                            <div className={`absolute ${umenu} right-0 border border-gray-300 z-10 mt-2 w-28 origin-top-right rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 `} >

                                <div>
                                    <Button onClick={handleDashboard} type="submit" className="block px-3 py-2 text-sm text-gray-700"
                                        isLoading={dashboardLoading}
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
                                        {!dashboardLoading && <>Dashboard</>}
                                    </Button>
                                </div>
                                <hr />
                                <div>
                                    <Button onClick={handleProfile} type="submit" className="block px-3 py-2 text-sm text-gray-700"
                                        isLoading={profileLoading}
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
                                        {!profileLoading && <>Profile</>}
                                    </Button>
                                </div>
                                <hr />


                                <Button onClick={() => signout()} type="submit" className="block px-3 py-2 text-sm text-gray-700"
                                    isLoading={loading}
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
                                    {!loading && <>Sign Out</>}
                                </Button>
                            </div>
                        </div>
                    </div>
                    // </div>
                }

            </div>

        </nav >
    )
}