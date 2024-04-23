"use client"
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";


export default function item() {
  const { data: session } = useSession();
  const [signin, setSignin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (session) {


      const id = session?.user?.id
      const url = `dashboard`

      router.replace(url)


    }

  }, [session]);

  const handleSubmit = async (e) => {


    setSignin(true)
    e.preventDefault()
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      if (res.error) {
        console.log(res);
        setError("invalid credentials")
        setSignin(false)
        return
      }




    }
    catch (error) {
      console.log("error:", error);

    }

  }


  return (

    <div className="flex justify-center">
      <div className="flex  min-h-full shadow-2xl border border-gray-300 rounded-xl mt-5 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>

              </div>
              <div className="mt-2">
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            {error &&
              <div className="bg-red-300 border border-red-600 rounded-md w-fit px-3">
                {error}
              </div>
            }

            <div>
              <Button onClick={handleSubmit} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                isLoading={signin}
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
                {!signin && <>Sign in</>}
              </Button>
            </div>


          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link href="/createUser" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

