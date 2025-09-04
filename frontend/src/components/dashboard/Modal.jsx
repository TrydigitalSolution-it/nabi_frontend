import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
export default function Modal({ isModel, setIsModel }) {
  const navigate = useNavigate();
  const [popup, setpopup] = useState({ show: false, message: "", type: "" });
  const [Required, setRequired] = useState(false);
  const [input, setInput] = useState({ fileName: "" });
  if (!isModel) return null;
  const handleChange = (event) => {
    setInput({ [event.target.name]: event.target.value });
  };
  const handleSubmit = () => {
    axios
      .post(
        "http://localhost:5000/dashboard/addfile",
        { input },
        { withCredentials: true }
      )
      .then((result) => {
        const data = result.data;
        setIsModel(false);
        setInput({fileName:""});
        setRequired(false)
        navigate("/dashboard");
      })
      .catch((err) => {
         setRequired(true);
    
      });
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
  <div className="bg-white p-6 rounded shadow-lg w-80 relative">
    {/* Close button */}
    <button
      onClick={() => {setIsModel(false),setRequired(false)}}
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl cursor-pointer font-bold"
    >
      &times;
    </button>

    <h2 className="text-lg font-bold mb-4">Add New File</h2>

    <input
      type="text"
      placeholder="Filename"
      value={input.fileName}
      onChange={handleChange}
      name="fileName"
      required
      className="border p-2 w-full mb-2"
    />
    {Required && <p className="text-red-500">File Name is required</p>}

    <div className="flex justify-end">
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded cursor-pointer"
      >
        Add
      </button>
    </div>
  </div>
</div>

  );
}
