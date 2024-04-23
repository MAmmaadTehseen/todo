import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
export default function item(props) {
    let { title, description, date, status, priority } = props;



    return (
        <div className={`  m-3 h-auto  border-2 border-cyan-700 rounded-lg`}>
            <div className="text-center my-3 border-b-8 border-cyan-700 "><strong>{title.length < 20 ? title : title.slice(0, 20) + "..."}</strong></div>
            <div className="m-3">{description.length < 30 ? description : description.slice(0, 30 ) + "...."}</div>
            <div className="m-3">Expires in {date} days</div>
            <div className="flex font-bold text-center mt-6 " >
                <p className="mx-3 w-20 ">status</p>
                <p className="mx-3 w-20 ">priority</p>
            </div>
            <div className="flex ">

            <div className={`border rounded-lg text-center h-7 w-20 mx-3   ${status == 'Active' ? "bg-green-600" : status == 'Done' ? "bg-blue-600" : "bg-gray-600"} `}>{status}</div>
            <div className={`${priority == 'High' ? "bg-red-600" : priority == 'Low' ? "bg-yellow-600" : "bg-orange-600"} mx-3  h-7 w-20 border rounded-lg text-center `}>{priority}</div>

            </div>
            <div className="flex m-3 justify-end">

                <button className="mx-4  ">
                  <FaEdit className="h-4"/>
                </button>
           

            
                <button className="mx-3  ">
                   <FaDeleteLeft/>
                </button>
            </div>

        </div>
    )
}