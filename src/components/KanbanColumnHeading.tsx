import { Edit, Save, Trash, X } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import { KanbanColumn, useKanbanState } from "../context/KanbanContext";

type Props = {
  column: KanbanColumn;
  index: number;
};

const KanbanColumnHeading = memo(({ column, index }: Props) => {
  const [changeColumn, setChangeColumn] = useState({ id: "", name: "" });
  const [editColumn, setEditColumn] = useState({ name: "", show: false });
  const { kanbanColumns, kanbanTasks, setKanbanColumns, setKanbanTasks } =
    useKanbanState();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const deleteColumn = (id: string) => {
    if (id !== "firstcolumn") {
      const newColumns = kanbanColumns.filter((column) => column.id !== id);
      setKanbanColumns(newColumns);
    }
  };

  const handleUpdateColumn = () => {
    const updatedColumns = kanbanColumns.map((column) => {
      if (column.id === changeColumn.id) {
        return {
          ...column,
          name: changeColumn.name,
        };
      }
      return column;
    });

    // Updating tasks via column id because the name has been changed
    const updatedTasks = kanbanTasks.map((task) => {
      const column = kanbanColumns.find(
        (column) => column.name === task.column_name
      );

      if (column && column.id === changeColumn.id) {
        return {
          ...task,
          column_name: changeColumn.name,
        };
      }
      return task;
    });

    setKanbanColumns(updatedColumns);
    setKanbanTasks(updatedTasks);

    setChangeColumn({ id: "", name: "" });
    setEditColumn({ name: "", show: false });
  };

  useEffect(() => {
    if (textareaRef.current && editColumn.show) {
      textareaRef.current.focus();
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [textareaRef, editColumn]);

  return (
    <div className="w-full flex items-center gap-x-2 justify-between">
      {editColumn.name === column.name && editColumn.show ? (
        <textarea
          ref={textareaRef}
          value={changeColumn.name}
          onChange={(e) =>
            setChangeColumn({ id: column.id, name: e.target.value })
          }
          placeholder="Enter Column name..."
          className="w-fit py-1 px-2 outline-none border-2 border-white rounded-md bg-transparent text-white"
        />
      ) : (
        <h2 className="w-full pl-3 whitespace-nowrap">{column?.name}</h2>
      )}

      <div className="flex items-center gap-x-2">
        {editColumn.name === column.name && editColumn.show ? (
          <div className="flex items-center gap-x-2">
            <button
              onClick={handleUpdateColumn}
              aria-label="Save changes"
              className="p-2 rounded-md hover:bg-green-600/20 cursor-pointer"
            >
              <Save className="size-5" aria-hidden />
            </button>
            <button
              aria-label="Close Edit"
              onClick={() => setEditColumn({ name: "", show: false })}
              className="p-2 rounded-md hover:bg-[#22272B] cursor-pointer"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setEditColumn({ name: column.name, show: true });
              setChangeColumn({ id: column.id, name: column.name });
            }}
            aria-label="Edit Column Name"
            className="p-2 hover:bg-green-700/20 rounded-md"
          >
            <Edit className="text-green-600 size-5" aria-hidden />
          </button>
        )}

        {index !== 0 && (
          <button
            aria-label="Delete Column"
            onClick={() => deleteColumn(column.id)}
            className="p-2 hover:bg-red-700/20 rounded-md"
          >
            <Trash className="text-red-600 size-5" aria-hidden />
          </button>
        )}
      </div>
    </div>
  );
});

export default KanbanColumnHeading;
