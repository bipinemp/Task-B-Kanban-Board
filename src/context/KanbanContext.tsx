import { createContext, useContext, useEffect, useState } from "react";

export type KanbanTask = {
  id: string;
  title: string;
  column_name: string;
};

export type KanbanColumn = {
  id: string;
  name: string;
};

type KanbanState = {
  kanbanTasks: KanbanTask[];
  setKanbanTasks: React.Dispatch<React.SetStateAction<KanbanTask[]>>;
  kanbanColumns: KanbanColumn[];
  setKanbanColumns: React.Dispatch<React.SetStateAction<KanbanColumn[]>>;
};

const kanbanContext = createContext<KanbanState | undefined>(undefined);

export const KanbanProvider = ({ children }: { children: React.ReactNode }) => {
  const [kanbanTasks, setKanbanTasks] = useState<KanbanTask[]>(() => {
    const tasks = localStorage.getItem("kanbanTasks");
    return tasks ? JSON.parse(tasks) : [];
  });

  const [kanbanColumns, setKanbanColumns] = useState<KanbanColumn[]>(() => {
    const columns = localStorage.getItem("kanbanColumns");
    return columns
      ? JSON.parse(columns)
      : [{ id: "firstcolumn", name: "General" }];
  });

  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(kanbanTasks));
  }, [kanbanTasks]);

  useEffect(() => {
    localStorage.setItem("kanbanColumns", JSON.stringify(kanbanColumns));
  }, [kanbanColumns]);

  return (
    <kanbanContext.Provider
      value={{ kanbanTasks, setKanbanTasks, kanbanColumns, setKanbanColumns }}
    >
      {children}
    </kanbanContext.Provider>
  );
};

export const useKanbanState = (): KanbanState => {
  const context = useContext(kanbanContext);

  if (!context) {
    throw new Error("useKanbanState must be used inside KanbanProvider only.");
  }

  return context;
};
