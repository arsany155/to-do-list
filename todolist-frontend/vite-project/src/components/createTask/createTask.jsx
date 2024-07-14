import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../redux/actions/taskAction";

export const CreateTask = ({setUserTasks}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskTitle , setTaskTitle] = useState("")
    const dispatch = useDispatch()
    const {userInfo} =  useSelector((state) => state.auth)
    const [taskDescription , setTaskDescription] = useState("")
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };


    const createTaskHandler = (e) => {
        e.preventDefault();
        let newTask = {taskTitle , taskDescription , userId : userInfo?.data?.id}
        dispatch(createTask(newTask)).then((response)=>{setUserTasks(response.payload.data)
        })
        toggleModal()
      };

    return (
        <>
        <div className="mt-5">
            
    <div>
      {/* Modal toggle button */}
      <button
        onClick={toggleModal}
        className="block text-white bg-slate-800 hover:bg-slate-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-5"
        type="button"
      >
        Create Task
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
                  Create New Task
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
                      name={taskTitle}
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Type task name"
                      required
                      onChange={(e)=>setTaskTitle(e.target.value)}
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
                      name={taskDescription}
                      onChange={(e)=>setTaskDescription(e.target.value)}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Write product description here"
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={createTaskHandler}
                  className="text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                 
                  Save
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