import { useEffect, useRef, useState } from "react";
import { useKanbanState } from "../../context/KanbanContext";
import { X } from "lucide-react";

type Props = {
  setShowTaskForm: React.Dispatch<
    React.SetStateAction<{
      column: string;
      show: boolean;
    }>
  >;
  showTaskForm: { column: string; show: boolean };

  column: string;
};

const TaskForm = ({ setShowTaskForm, column, showTaskForm }: Props) => {
  const { setKanbanTasks } = useKanbanState();
  const [task, setTask] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim() === "") return;

    const newTask = {
      id: crypto.randomUUID(),
      title: task,
      column_name: column,
    };

    setKanbanTasks((prev) => [...prev, newTask]);
    setTask("");
  };

  // For submiting form while clicking enter on textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    }
  };

  useEffect(() => {
    if (showTaskForm.show && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [showTaskForm, textareaRef]);

  return (
    <div className="min-w-[300px] w-full flex flex-col gap-y-4 mt-2">
      <form
        ref={formRef}
        onSubmit={handleTaskSubmit}
        className="flex flex-col gap-y-3"
      >
        <textarea
          ref={textareaRef}
          onKeyDown={handleKeyDown}
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task..."
          className="w-full py-2 px-4 rounded-lg text-white border-2 border-white bg-transparent outline-none"
        />

        <div className="flex items-center gap-x-3">
          <button
            disabled={task.trim() === ""}
            className={`w-fit ml-1 ${
              task.trim() === "" ? "bg-rose-400" : "bg-rose-600"
            } text-white font-semibold py-2 px-4 rounded-md disabled:cursor-not-allowed`}
          >
            Create Task
          </button>

          <button
            aria-label="Close"
            onClick={() => setShowTaskForm({ column: "", show: false })}
            className="p-2 rounded-md hover:bg-[#22272B] cursor-pointer"
          >
            <X className="size-6" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
