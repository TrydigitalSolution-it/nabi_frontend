import FileItem from "./FileItem";

function FileList() {
  const demoFiles = [
    { id: 1, name: "First Note" },
    { id: 2, name: "Shopping List" },
    { id: 3, name: "Todo" },
  ];

  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {demoFiles.map((file) => (
        <FileItem key={file.id} file={file} />
      ))}
    </ul>
  );
}

export default FileList;
