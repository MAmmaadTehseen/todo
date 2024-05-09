"use client"
import { useSession } from "next-auth/react"
import Signin from "./components/Signin"




export default function page() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-center h-screen">

      <div className=" ">

        <Signin />

      </div>
    </div>
  )




}