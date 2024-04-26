"use client"
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { AvatarComponent } from 'avatar-initials';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";




export default function navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [umenu, setumenu] = useState("hidden");
    let { data: session } = useSession();
    const [initials, setinitials] = useState("AM")
    const [user, setUser] = useState(null)
    const [loading, setloading] = useState(false)
    const [profileLoading, setProfileloading] = useState(false)
    const [dashboardLoading, setDashboardloading] = useState(false)
    const router = useRouter()

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
            setinitials(`${name[0][0]}${name[1][0]}`)

        }

    })


    const signout = () => {
        setloading(true)
        signOut()
    }



    const handleProfile = () => {
        setumenu("hidden")
        router.replace("profile")

    }
    const handleDashboard = () => {
        setumenu("hidden")
        router.replace("dashboard")

    }
    const handleUmenu = () => {

        umenu == "hidden" ? setumenu("") : setumenu("hidden");
    }




    return (
        <nav className="flex bg-blue-500 text-cyan-50 justify-between fixed left-0 right-0 top-0 ">
            <button onClick={() => router.replace("dashboard")}>

                <p className="flex text-5xl p-3 ">Todo</p>
            </button>
            <div className="flex "> </div>
            <div className="flex ">

                {session &&
                    <div className="flex justify-center text-center">

                        <div className="relative ">
                            <div>
                                <button type="button" onClick={handleUmenu} className="m-3 relative flex rounded-full bg-blue-500 text-sm focus:outline-none " >
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
                                    <LoadingButton onClick={handleDashboard} type="submit" className="block px-3 py-2 text-sm text-gray-700"
                                        loading={dashboardLoading}

                                    >
                                        Dashboard
                                    </LoadingButton>
                                </div>
                                <hr />
                                <div>
                                    <LoadingButton onClick={handleProfile} type="submit" className="block px-3 py-2 text-sm text-gray-700"
                                        loading={profileLoading}

                                    >
                                        Profile
                                    </LoadingButton>
                                </div>
                                <hr />


                                <LoadingButton onClick={() => signout()} type="submit" className="block px-3 py-2 text-sm text-gray-700"
                                    loading={loading}

                                >
                                    Sign Out
                                </LoadingButton>
                            </div>
                        </div>
                    </div>
                    // </div>
                }

            </div>

        </nav >
    )
}