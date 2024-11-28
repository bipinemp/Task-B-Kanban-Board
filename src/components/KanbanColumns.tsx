import { useState } from "react";
import { useKanbanState } from "../context/KanbanContext";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import TaskForm from "./forms/TaskForm";
import { CirclePlus } from "lucide-react";
import KanbanColumnHeading from "./KanbanColumnHeading";
import KanbanTask from "./KanbanTask";

const KanbanColumns = () => {
  const { kanbanTasks, kanbanColumns, setKanbanTasks } = useKanbanState();
  const [showTaskForm, setShowTaskForm] = useState({
    column: "",
    show: false,
  });

  // For smooth animation while adding/deleting columns
  const [columnsRef] = useAutoAnimate();

  return (
    <div
      ref={columnsRef}
      className="w-full flex gap-x-10 overflow-x-auto pb-10 px-10 z-0 column-scrollbar"
    >
      {kanbanColumns?.map((column, index) => (
        <div
          key={column.id}
          className="max-w-full w-auto relative h-full bg-[#111304] p-3 text-white rounded-lg"
        >
          <KanbanColumnHeading column={column} index={index} />

          <KanbanTask
            column={column}
            kanbanTasks={kanbanTasks}
            setKanbanTasks={setKanbanTasks}
          />

          {/* For showing Task Create Input  */}
          {showTaskForm.column === column.name && showTaskForm.show ? (
            <TaskForm
              showTaskForm={showTaskForm}
              setShowTaskForm={setShowTaskForm}
              column={column.name}
            />
          ) : (
            <button
              onClick={() =>
                setShowTaskForm({ column: column.name, show: true })
              }
              className="min-w-[300px] w-full flex items-center transition hover:bg-[#22272B] gap-x-2 py-2 px-4 rounded-md text-white"
            >
              <CirclePlus className="size-5" /> Add a Task
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default KanbanColumns;
