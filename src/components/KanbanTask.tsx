import { Fragment, memo } from "react";
import DropZone from "./ui/DropZone";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import {
  KanbanColumn,
  KanbanTask as KanbanTaskType,
} from "../context/KanbanContext";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = {
  kanbanTasks: KanbanTaskType[];
  column: KanbanColumn;
  setKanbanTasks: (value: React.SetStateAction<KanbanTaskType[]>) => void;
  activeTask: string | null;
  setActiveTask: React.Dispatch<React.SetStateAction<string | null>>;
};

const KanbanTask = memo(
  ({
    kanbanTasks,
    setKanbanTasks,
    column,
    activeTask,
    setActiveTask,
  }: Props) => {
    // For smooth animation while creating/deleting/sorting tasks
    const [tasksRef] = useAutoAnimate();

    const deleteTask = (id: string) => {
      const newTasks = kanbanTasks.filter((task) => task.id !== id);
      setKanbanTasks(newTasks);
    };

    const onDrop = (column_name: string, position: number) => {
      if (!activeTask) return;

      const taskMoved = kanbanTasks.find((task) => task.id === activeTask);

      if (taskMoved) {
        const updatedTasks = kanbanTasks.filter(
          (task) => task.id !== activeTask
        );
        updatedTasks.splice(position, 0, {
          ...taskMoved,
          column_name,
        });
        setKanbanTasks(updatedTasks);
        setActiveTask(null);
      }
    };

    // For sorting tasks up and down
    const onSort = (
      column_name: string,
      position: number,
      id: string,
      up: boolean
    ) => {
      const sortingTask = kanbanTasks.find((task) => task.id === id);
      if (sortingTask) {
        const columnTasks = kanbanTasks.filter(
          (task) => task.column_name === column_name
        );

        const filteredTasks = columnTasks.filter((task) => task.id !== id);

        // For bounding the position between 0 and array length
        const updatedPosition = Math.max(
          0,
          Math.min(position + (up ? -1 : 1), filteredTasks.length)
        );

        // putting task on specified position
        filteredTasks.splice(updatedPosition, 0, sortingTask);

        const updatedKanbanTasks = [
          ...kanbanTasks.filter((task) => task.column_name !== column_name),
          ...filteredTasks,
        ];

        setKanbanTasks(updatedKanbanTasks);
      }
    };

    return (
      <div className="w-full relative flex flex-col h-[90%]" ref={tasksRef}>
        <DropZone onDrop={onDrop} column_name={column.name} index={0} />

        {kanbanTasks
          .filter((task) => task.column_name === column.name)
          .map((task, idx) => {
            const isLast =
              idx ===
              kanbanTasks?.filter((task) => task.column_name === column.name)
                .length -
                1;

            const isFirst = idx === 0;
            const isOnlyOne =
              kanbanTasks?.filter((task) => task.column_name === column.name)
                .length === 1;

            return (
              <Fragment key={task.id}>
                <div
                  draggable
                  onDragStart={() => setActiveTask(task.id)}
                  onDragEnd={() => setActiveTask(null)}
                  tabIndex={0}
                  className="opacity-100 flex justify-between relative transition py-3 pl-4 pr-3 border border-black bg-[#22272B] text-white rounded-lg active:bg-neutral-600 active:border-white cursor-grab"
                >
                  <p>{task.title}</p>

                  {!isOnlyOne && (
                    <div className="flex items-center gap-x-2">
                      <div className="flex items-center gap-x-1 z-10">
                        {!isFirst && (
                          <button
                            aria-label="Move task up"
                            onClick={() =>
                              onSort(column.name, idx, task.id, true)
                            }
                            className="p-2 rounded-md bg-neutral-700 cursor-pointer transition hover:border-white border border-transparent"
                          >
                            <ChevronUp className="size-4" aria-hidden />
                          </button>
                        )}
                        {!isLast && (
                          <button
                            aria-label="Move task down"
                            onClick={() =>
                              onSort(column.name, idx, task.id, false)
                            }
                            className="p-2 rounded-md bg-neutral-700 cursor-pointer transition hover:border-white border border-transparent"
                          >
                            <ChevronDown className="size-4" aria-hidden />
                          </button>
                        )}
                      </div>
                      <button
                        aria-label="Delete Task"
                        onClick={() => deleteTask(task.id)}
                        className="p-2 hover:bg-red-700/30 rounded-md"
                      >
                        <Trash className="text-red-600 size-5" aria-hidden />
                      </button>
                    </div>
                  )}
                </div>

                <DropZone
                  onDrop={onDrop}
                  column_name={column.name}
                  index={idx + 1}
                />
              </Fragment>
            );
          })}
      </div>
    );
  }
);

export default KanbanTask;
