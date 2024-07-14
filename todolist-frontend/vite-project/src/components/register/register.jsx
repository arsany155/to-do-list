import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/actions/authAction";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const Register = () => {
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [name , setName] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {registerSuccess , error} =  useSelector((state) => state.auth)
    //console.log(registerSuccess)
    const registerHandler = (e) => {
        e.preventDefault();
        let userInfo = {name , email , password}
        dispatch(registerUser(userInfo))
     
      };

      useEffect(() => {
        if (registerSuccess == true) {
          navigate('/login')
        }
      }, [navigate, registerSuccess])

      const notify = () => {
        toast.error(error, {
            toastStyle: { backgroundColor: 'red' } // Set style to make it red
        });
    };

      useEffect(() => {
        if (error) {
          notify()
        }
      }, [error])


    return (
        <>
        <ToastContainer />
       <section className="bg-gray-50">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Create an account
        </h1>
        <form className="space-y-4 md:space-y-6" action="#">
          <div>
            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">name</label>
            <input onChange={(e)=>setName(e.target.value)} type="text" name={name} id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400" placeholder="name@email.com" required="" />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">email</label>
            <input onChange={(e)=>setEmail(e.target.value)} type="email" name={email} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400" placeholder="name@email.com" required="" />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <input onChange={(e)=>setPassword(e.target.value)} type="password" name={password} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400" required="" />
          </div>
          <button onClick={registerHandler} type="submit" className="w-full text-white bg-slate-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
        </form>
      </div>
    </div>
  </div>
</section>
        </>
    )
}