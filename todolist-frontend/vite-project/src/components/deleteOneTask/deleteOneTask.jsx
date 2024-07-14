import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getAllTasks } from "../../redux/actions/taskAction";

export const DeleteOneTask = ({ setUserTasks, taskId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [taskDescription, setTaskDescription] = useState("");
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const deleteTaskHandler = (e) => {
    e.preventDefault();
    let deleteInfo = { taskId, userId: userInfo?.data?.id };

    dispatch(deleteTask(deleteInfo)).then((response) => {
      if (response.type == "tasks/delete/fulfilled") {
        dispatch(getAllTasks(userInfo?.data?.id)).then((response)=>{setUserTasks(response.payload.data)})
      } else {
        //console.log("not deleted");
      }
    });
    toggleModal();
  };

  return (
    <>
      <div className="mt-5">
        <div>
          {/* Modal toggle button */}
          <button
            onClick={toggleModal}
            className="block text-white bg-red-800 hover:bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="button"
          >
            Delete Task
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
                      Delete This Task
                    </h3>

                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                      onClick={toggleModal}
                    >
                      <span className="sr-only">Close</span>
                    </button>
                  </div>
                  {/* Modal body */}
                  <form className="p-4">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <p>Are you sure .. you want to delete this task ?</p>
                    </div>
                    <button
                      type="submit"
                      onClick={deleteTaskHandler}
                      className="text-white inline-flex items-center bg-red-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Delete
                    </button>
                    <button
                      type="submit"
                      onClick={toggleModal}
                      className=" ml-20 text-white inline-flex items-center bg-red-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
