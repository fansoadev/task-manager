import { create } from "zustand";

// Mise en place du type de "task"
type Task = {
  id: number;
  title: string;
};

// Mise en place du type de données pour le store du "useTaskManager"
type TaskManagerState = {
  tasks: Task[];
  searchTask: (title: string) => void;
  addTask: (title: string) => void;
  updateTask: (id: number, title: string) => void;
  deleteTask: (id: number) => void;
};

// Création du hook useTaskManager en utilisant Zustand
const useTaskManager = create<TaskManagerState>((set) => ({
  tasks: [],
  // Fonction pour rechercher une tâche en fonction du titre
  searchTask: (title) => {
    set((state) => ({
      tasks: state.tasks.filter((task) =>
        task.title.toLowerCase().includes(title.toLowerCase())
      ),
    }));
  },
  // Fonction pour ajouter une nouvelle tâche à la liste
  addTask: (title) => {
    set((state) => ({
      tasks: [...state.tasks, { id: state.tasks.length + 1, title: title }],
    }));
  },
  // Fonction pour mettre à jour les détails d'une tâche existante (titre)
  updateTask: (id, title) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, title: title } : task
      ),
    }));
  },
  // Fonction pour supprimer une tâche de la liste
  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
}));

export { useTaskManager };
