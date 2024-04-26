"use client"
import { useSession } from "next-auth/react"
import Signin from "./components/Signin"




export default function page() {
  const { data: session } = useSession();

  return (
    <>
      <Signin />
    </>
  )




}