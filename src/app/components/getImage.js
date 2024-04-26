import { useState } from "react";
import { useSession } from "next-auth/react";
import { LoadingButton } from "@mui/lab";
// import { Button } from "@nextui-org/react";


export default function getImage({ onSubmit }) {
    const { data: session } = useSession()
    const [imageUrl, setImageUrl] = useState("")
    const [disable, setDisable] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dwgzndxmx/image/upload';
    const CLOUDINARY_UPLOAD_PRESET = 'blmyrnhl';

    const imageSumbition = (e) => {
        setDisable(true)
        const file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            setImageUrl(reader.result)
            console.log('RESULT', reader.result)
        }
        reader.readAsDataURL(file);
        setDisable(false)


    }


    const uploadImage = async () => {
        if (imageUrl == "") {
            setError("Please Select an image first")
            return
        }
        setLoading(true)

        const includeImage = await fetch('/api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({

                url: imageUrl, id: session.user.id,

            }),
        });
        console.log("image")
        if (!includeImage) {
            setError("Error")
            return
        }



        const close = () => onSubmit()
        close()

    }
    return (
        <div>
            <h1 className="font-bold">Let the world see your Beauty</h1>
            <div className="flex flex-col p-3 max-h-fit ">
                <label className="m-3" htmlFor="image" >Add image</label>
                <input className="m-3" type="file" onChange={imageSumbition} id="fileupload" name="image" />
                {error && <div className="bg-red-300 border border-red-600 rounded-md w-fit px-3">{error}</div>}
                <LoadingButton onClick={uploadImage} type="submit" color="success" variant="contained" className={`border m-3 flex w-16 p-2 rounded-md`}
                    loading={loading}

                >
                    Upload
                </LoadingButton>

            </div>


        </div>
    )
}
