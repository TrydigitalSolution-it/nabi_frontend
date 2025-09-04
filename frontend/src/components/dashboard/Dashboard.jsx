import { Plus } from "lucide-react";
import { LogOut } from "lucide-react";

import FileList from "./FileList";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

function Dashboard() {
  const navigate = useNavigate();
  const [popup, setpopup] = useState({ show: false, message: "", type: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isModel,setIsModel] = useState(false)
  useEffect(() => {
    axios
      .get("http://localhost:5000/dashboard/dashboard", {
        withCredentials: true,
      })
      .then((result) => {
        // console.log(result);
        setLoggedIn(true);
      })
      .catch((err) => {
        const data = err.response.data;
        setpopup({ show: true, message: data.message, type: "error" });
        setTimeout(() => {
          setpopup({ show: false, message: data.message, type: "error" });
          navigate("/");
        }, 3000);
      });
  }, []);

  const handleLogout = (event) => {
    axios
      .post("http://localhost:5000/user/logout",{},{ withCredentials: true })
      .then((result) => {
        console.log(result);
        const data = result.data;
         setpopup({ show: true, message: data.message, type: "success" });
        setTimeout(() => {
          setpopup({ show: false, message: data.message, type: "error" });
          navigate("/");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
   const handleAddFile = ()=>{
      setIsModel(true);
  };
  return (
    <div className="p-6">
      {/* Header */}
      {loggedIn && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">📒 My Notepad Files</h1>
            <div className="flex gap-2">
              <button onClick={handleAddFile} className="flex cursor-pointer items-center  font-bold gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-2xl shadow">
                <Plus size={20} /> Add File
              </button>
                <button onClick={handleLogout} className="flex cursor-pointer items-center gap-2 font-bold bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-2xl shadow">
                  <LogOut size={20} /> LogOut
                </button>
            </div>
          </div>
          <FileList />
        </div>
      )}
      {/* File List */}

      {popup.show && (
        <div
          className={`fixed top-60 left-110 p-4 rounded shadow-lg text-white z-50
          ${popup.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {popup.message}
        </div>
      )}
     
      <Modal isModel={isModel} setIsModel={setIsModel}/>
    </div>
    
  );

}
export default Dashboard;
