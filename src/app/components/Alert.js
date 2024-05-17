import { Alert } from "antd";

export default function message({ message }) {
    return (
        <div className=" z-50 fixed bg-green-400 border-none rounded-lg top-16 right-0 left-0 justify-center items-center ">

            {message &&
                <Alert message={message} type="success" />

            }
        </div>
    )
}
