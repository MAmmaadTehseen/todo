"use client"
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { AvatarComponent } from 'avatar-initials';
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";




export default function navbar() {
    const [umenu, setUmenu] = useState("hidden");
    let { data: session } = useSession();
    const [initials, setInitials] = useState("AM")
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let name = (session?.user?.name)
        async function fetchdata() {


            const url = `/api/singleUser/?id=${session?.user?.id}`
            const res = await fetch(url, { cache: "no-cache" });
            if (res.ok) {

                setUser(await res.json());


            }
        }

        if (session) {
            fetchdata()
            name = name.split(" ")
            setInitials(`${name[0][0]}${name[1][0]}`)

        }

    }, [session])


    const signout = () => {
        setLoading(true)
        signOut()
    }




    const handleUmenu = () => {

        umenu == "hidden" ? setUmenu("") : setUmenu("hidden");
    }




    return (
        <nav className="flex bg-blue-500 text-cyan-50 justify-between fixed left-0 right-0 top-0  z-50">
            <Link href={"/dashboard"}>

                <p className="flex text-5xl p-3 ">Todo</p>
            </Link>
            <div className="flex "> </div>
            <div className="flex ">

                {session &&
                    <div className="flex justify-center text-center">

                        <div className="relative z-50">
                            <div>
                                <button type="button" onClick={handleUmenu} className="m-3 relative flex rounded-full bg-blue-500 text-sm focus:outline-none " >
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Open user menu</span>
                                    <div className=" flex justify-center">
                                        {user && <AvatarComponent
                                            classes="rounded-full"
                                            useGravatar={false}
                                            size={44}
                                            // primarySource={user?.url}
                                            color="#000000"
                                            background="#BFCA98"
                                            fontSize={22}


                                            fontWeight={400}
                                            offsetY={24}
                                            initials={initials}
                                        />}

                                        {user?.url && <Image className="border rounded-full" src={user.url} fill={true} alt="profile photo" />}



                                    </div>
                                </button>
                            </div>
                            <div className={`absolute ${umenu} right-0 border border-gray-300 z-10 mt-2 w-28 origin-top-right rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 `} >


                                <Link href={"/dashboard"} onClick={() => setUmenu("hidden")} className="block px-1 py-2 text-sm text-gray-700">
                                    <LoadingButton className="block  py-2 text-sm text-gray-700">

                                        Dashboard
                                    </LoadingButton>

                                </Link>

                                <hr />

                                <Link href={"/profile"} onClick={() => setUmenu("hidden")} className="block px-1 py-2 text-sm text-gray-700">
                                    <LoadingButton className="block  py-2 text-sm text-gray-700">

                                        Profile
                                    </LoadingButton>

                                </Link>

                                <hr />

                                <Link href={""} className="block  py-2 px-1 text-sm text-gray-700">
                                    <LoadingButton onClick={() => signout()} type="submit" className="block  py-2 text-sm text-gray-700"
                                        loading={loading}

                                    >
                                        Sign Out
                                    </LoadingButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                    // </div>
                }

            </div>

        </nav >
    )
}