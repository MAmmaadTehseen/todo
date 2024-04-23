import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";


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
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        fetch(CLOUDINARY_URL, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then((data) => {
                if (data.secure_url !== '') {
                    const uploadedFileUrl = data.secure_url;

                    setImageUrl(uploadedFileUrl)

                    setDisable(false)

                }
            })
            .catch(err => console.error(err));
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


        console.log(imageUrl)
        const close = () => onSubmit()
        close()

    }
    return (
        <div>
            <h1 className="font-bold">Let the world see your Beauty</h1>
            <div className="flex flex-col p-3">
                <label className="m-3" htmlFor="image" >Add image</label>
                <input className="m-3" type="file" onChange={imageSumbition} id="fileupload" name="image" />
                {error && <div className="bg-red-300 border border-red-600 rounded-md w-fit px-3">{error}</div>}
                <Button onClick={uploadImage} type="submit" className={`border m-3 flex w-16 p-2 rounded-md bg-blue-500`}
                    isLoading={loading}
                    disabled={disable}
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
                    Upload
                </Button>

            </div>


        </div>
    )
}
