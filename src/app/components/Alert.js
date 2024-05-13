import { IconButton } from "@mui/material";
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

export default function message({ message }) {
    const [open, setOpen] = useState(true)
    return (
        <div className=" z-50fixed bg-green-400 border-none rounded-lg top-16 right-0 left-0 justify-center items-center ">

            {message && <Collapse in={open}>

                <Alert className=" " severity="success"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"

                            onClick={() => {
                                setOpen(false)
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }>{message}</Alert>
            </Collapse>}
        </div>
    )
}
