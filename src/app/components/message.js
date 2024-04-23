import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function message({ message, onClose }) {
    return (
        <div className="fixed bg-green-400 border-none rounded-lg top-16 right-0 left-0 justify-center items-center ">
            <div className="relative ">
                {message && <div className="text-xl">
                    {message}
                </div>}
                {message && <button className="absolute right-0 top-0 bottom-0 p" onClick={() => onClose()}> <FontAwesomeIcon style={{ fontSize: "25px" }} icon={faXmark}></FontAwesomeIcon></button>}
            </div>
        </div>
    )
}
