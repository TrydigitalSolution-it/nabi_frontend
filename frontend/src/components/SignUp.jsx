import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
export default function SignUp() {
  const [inputs, setInputs] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [popup,setpopup] = useState({show:false,message:"",type:""})
  const inputChange = (event) => {
    setInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/user/adduser", inputs)
      .then(
        (response) => {
          const data = response.data;
          setpopup({show:true,message:data.message,type:"success"})
          setInputs({userName:"",password:"",email:""});
           setTimeout(()=>{
           setpopup({show:false,message:data.message,type:"error"}) 
        },2000)   
      })
      .catch((err) => {
        const data = err.response.data;
        console.log(err);
        setpopup({show:true,message:data.message,type:"error"}) 
        setTimeout(()=>{
           setpopup({show:false,message:data.message,type:"error"}) 
        },2000)
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Sign Up
        </h1>
        <p className="text-center text-gray-500 mb-6">Create a new account</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="userName"
            value={inputs.userName}
            placeholder="Full Name"
            onChange={inputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="email"
            value={inputs.email}
            placeholder="Email"
            onChange={inputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          <input
            type="password"
            name="password"
            value={inputs.password}
            placeholder="Password"
            onChange={inputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 hover:underline">
            Sign In
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
  );
}
