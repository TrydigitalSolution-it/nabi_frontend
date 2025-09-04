import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
export default function Login(){
  const navigate = useNavigate();
  const [popup,setpopup] = useState({show:false,message:"",type:""})
  const [inputs, setInputs] = useState({
      email: "",
      password: "",
    });
    const handleChange = (event)=>{
        setInputs((pre)=>({
            ...pre,
            [event.target.name]:event.target.value
        }))
    }
    const handleSubmit = ((event)=>{
        event.preventDefault();
        axios.post("http://localhost:5000/user/loginuser",inputs, { withCredentials: true }).then(
        (response) => {
          const data = response.data;
          setpopup({show:true,message:data.message,type:"success"})
          setInputs({userName:"",password:"",email:""});
           setTimeout(()=>{
           setpopup({show:false,message:data.message,type:"error"}) 
        },2000) 
        navigate("/dashboard")  
      })
      .catch((err) => {
        // const data = err.response.data;
        console.log(err);
      //   setpopup({show:true,message:data.message,type:"error"}) 
      //   setTimeout(()=>{
      //      setpopup({show:false,message:data.message,type:"error"}) 
      //   },2000)
      });
 })
return (
<div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">Sign In</h1>
        <p className="text-center text-gray-500 mb-6">
          Welcome back! Please login
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
             value={inputs.email}
             onChange={handleChange}
             name="email"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={inputs.password}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
      {popup.show && (
        <div className={`fixed top-4 right-4 p-4 rounded shadow-lg text-white z-50
          ${popup.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {popup.message}
          <button onClick={() => setPopup({ ...popup, show: false })} className="ml-2">✖</button>
        </div>
      )}
    </div>
    
) 
}