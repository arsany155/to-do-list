import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {  getAllTasks } from "../../redux/actions/taskAction"
import { CreateTask } from "../createTask/createTask"
import { DeleteOneTask } from "../deleteOneTask/deleteOneTask"
import { UpdateOneTask } from "../updateOneTask/updateOneTask"

export const Home = () => {
    const {userInfo , error } = useSelector((state) => state.auth)
    const [userTasks , setUserTasks] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    useEffect(() => {
        if (!userInfo) {
          navigate('/login')
        }
      }, [navigate, userInfo])
     
      useEffect(()=> {
        dispatch(getAllTasks(userInfo?.data?.id)).then((response)=>{setUserTasks(response.payload.data)})
      },[])

      const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

return (
    <>

    <div className=" m-5 bg-slate-700">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right  ">
                <thead className="text-xs text-white uppercase ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Task Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                       
                        <th scope="col" className="px-6 py-3">
                            Edit
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                
                    {userTasks?.map((task , index)=>(
                         <tr className="bg-slate-500" key={task.id}>
                        <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                            {index + 1}
                        </th>
                        <td className="px-6 py-4 text-white">
                            {task.title}
                        </td>
                        <td className="px-6 py-4 text-white truncate-ellipsis" style={{ maxWidth: '300px' }}>
                            <span title={task.description}>{truncateText(task.description, 50)}</span>
                        </td>
                        
                        <td className="px-6 py-4 text-white">
                         <UpdateOneTask  setUserTasks={setUserTasks} taskId={task.id}/>
                        </td>
                        <td className="px-6 py-4 text-white">
                          <DeleteOneTask taskId={task.id} setUserTasks={setUserTasks}/>
                        </td>
                    </tr> 
                    ))}
                </tbody>
            </table>
        </div>
        </div>
        <CreateTask setUserTasks={setUserTasks}/>
    </>
)
}