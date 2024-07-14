import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks, getOneTask, updateTask } from "../../redux/actions/taskAction";


export const UpdateOneTask = ({setUserTasks , taskId}) => {
    const [taskInfo , setTaskInfo] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedTitle , setUpdatedTitle] = useState(taskInfo?.title)
    const [updatedDescription , setUpdatedDescription] = useState(taskInfo?.description)

    const dispatch = useDispatch()
    const {userInfo} =  useSelector((state) => state.auth)
   
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };


    useEffect(() => {
        if (isModalOpen && taskInfo) {
          setUpdatedTitle(taskInfo.title);
          setUpdatedDescription(taskInfo.description);
        }
      }, [isModalOpen, taskInfo]);


    const getTaskDataHandler = (e) => {
        e.preventDefault();
     
        dispatch(getOneTask(taskId)).then((response)=>{setTaskInfo(response?.payload?.data)})
        toggleModal()
      };
    const updateTaskDataHandler = (e) => {
        e.preventDefault();
      
        dispatch(updateTask({taskId,updatedTitle,updatedDescription}))
        .then((response) => {
        
            if (response.type == "tasks/updateTask/fulfilled") {
              dispatch(getAllTasks(userInfo?.data?.id)).then((response)=>{setUserTasks(response.payload.data)})
              toggleModal()
            } else {
              //console.log("not updated");
            }
          })
       
      };

    return (
        <>
        <div className="mt-5">
            
    <div>
      {/* Modal toggle button */}
      <button
          onClick={getTaskDataHandler}
        className="block text-white bg-gray-900 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
      >
        Update Task
      </button>

      {/* Main modal */}
      {isModalOpen && (
        <div
          id="crud-modal"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 border-b rounded-t">
                <h3 className="text-lg font-semibold text-gray-900">
                  Update Task
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={toggleModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close</span>
                </button>
              </div>
              {/* Modal body */}
              <form className="p-4">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Task Name
                    </label>
                    <input
                      type="text"
                    
                      value={updatedTitle}
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Type task name"
                      required
                      onChange={(e)=>setUpdatedTitle(e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Task Description
                    </label>
                    <textarea
                      id="description"
                      rows="4"
                     
                      value={updatedDescription}
                      onChange={(e)=>setUpdatedDescription(e.target.value)}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Write product description here"
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={updateTaskDataHandler}
                  className="text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                 
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
        </div>
        
        </>
    )
}