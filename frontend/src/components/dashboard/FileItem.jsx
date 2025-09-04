import { Trash2 } from "lucide-react";

function FileItem({ file }) {
  return (
    <li className="flex justify-between cursor-pointer items-center bg-white p-4 rounded-2xl shadow hover:shadow-md transition">
      <span>{file.name}</span>
      <button className="text-red-500 hover:text-red-700">
        <Trash2 className="cursor-pointer" size={20} />
      </button>
    </li>
  );
}

export default FileItem;
