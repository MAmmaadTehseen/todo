import Alert from '@mui/material/Alert';
import { useState } from "react";

export default function message({ message }) {
    const [open, setOpen] = useState(true)
    return (
        <div className=" z-50 fixed bg-green-400 border-none rounded-lg top-16 right-0 left-0 justify-center items-center ">

            {message &&

                <Alert className=" " severity="success"

                >{message}</Alert>
            }
        </div>
    )
}
