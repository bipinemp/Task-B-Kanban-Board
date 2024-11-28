import { useState } from "react";
import { useKanbanState } from "../../context/KanbanContext";
import { Plus } from "lucide-react";

const ColumnForm = () => {
  const { setKanbanColumns } = useKanbanState();
  const [column, setColumn] = useState("");

  const handleColumnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (column.trim() === "") return;

    const newColumn = {
      id: crypto.randomUUID(),
      name: column,
    };

    setKanbanColumns((prev) => [...prev, newColumn]);
    setColumn("");
  };

  return (
    <form
      onSubmit={handleColumnSubmit}
      className="w-full mx-auto py-5 flex items-center justify-center gap-x-3 bg-black/30 z-10"
    >
      <input
        value={column}
        onChange={(e) => setColumn(e.target.value)}
        type="text"
        placeholder="Enter column..."
        className="focus:ring-2 ring-rose-500 ring-offset-2 py-2 px-4 rounded-full text-white bg-transparent border-2 border-white outline-none"
      />

      <button
        disabled={column.trim() === ""}
        className={`flex focus:ring-2 items-center gap-x-2 ${
          column.trim() === "" ? "bg-rose-400" : "bg-rose-600"
        } text-white font-semibold py-2 px-4 rounded-md disabled:cursor-not-allowed`}
      >
        <Plus className="size-5" />
        Create Column
      </button>
    </form>
  );
};

export default ColumnForm;
