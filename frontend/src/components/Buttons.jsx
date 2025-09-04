import { useNavigate, useLocation } from "react-router-dom";

const Buttons = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  
  const buttons = [
    { label: "Sign Up", path: "/signup" },
    { label: "Sign In", path: "/signin" },
    { label: "Dashboard", path: "/dashboard" },
  ];
  return (
    <div className="flex gap-4 justify-center py-6">
       
      {buttons.map((btn)=>{
        return(
          (pathname!="/dashboard" &&
          <button
          key={btn.path}
          onClick={() =>{navigate(btn.path)}}
          className={`px-6 py-2 rounded-2xl border font-semibold shadow-sm transition cursor-pointer
            ${
              pathname === btn.path 
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-400 hover:bg-gray-100"
            }`}
        >
          {btn.label}
        </button>)
      )
      })}
    </div>
  );
};

export default Buttons;
