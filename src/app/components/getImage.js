import { useState } from "react";
import { useSession } from "next-auth/react";
import { LoadingButton } from "@mui/lab";
import Image from "next/image";


export default function getImage({ onSubmit }) {
    const { data: session } = useSession()
    const [imageUrl, setImageUrl] = useState("")
    const [image, setImage] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    const imageSumbition = (e) => {
        setDisable(true)
        const file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            setImageUrl(reader.result)
            setImage(reader.result)

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
        <div className="">
            <h1 className="font-bold">Let the world see your Beauty</h1>
            <div className="flex flex-col-reverse   ">

                <div className="flex flex-col p-3 max-h-fit min-w-fit ">
                    <label className="m-3 font-bold" htmlFor="image" >Add image</label>
                    <input className="m-3" type="file" onChange={imageSumbition} id="fileupload" name="image" />
                    {error && <div className="bg-red-300 border border-red-600 rounded-md w-fit px-3">{error}</div>}
                    <LoadingButton onClick={uploadImage} type="submit" color="success" variant="contained" className={`border m-3 flex w-16 p-2 rounded-md`}
                        loading={loading}

                    >
                        Upload
                    </LoadingButton>

                </div>
                <div >{image && <Image src={image} height={100} width={100} alt="" />}</div>
            </div>


        </div>
    )
}
