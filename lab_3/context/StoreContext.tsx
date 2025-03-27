import { createContext, useContext, useReducer } from 'react';
import { TTask } from '~/types';

type TProvider = {
  children: React.ReactNode;
};
type TAction = {
  type:
    | 'ADD_CLICK_PROGRESS'
    | 'ADD_DOUBLE_CLICK_PROGRESS'
    | 'ADD_HOLD_PROGRESS'
    | 'ADD_DRAG_PROGRESS'
    | 'ADD_SWIPE_RIGHT_PROGRESS'
    | 'ADD_SWIPE_LEFT_PROGRESS'
    | 'ADD_RESIZE_PROGRESS';
};
type TContext = {
  score: number;
  tasks: TTask[];
  dispatchTask: React.Dispatch<TAction>;
};

const taskReducer = (state: TTask[], action: TAction) => {
  const score = state.find((task) => task.id === 8)!;
  const randomNumber = Math.floor(Math.random() * 10) + 1;

  switch (action.type) {
    case 'ADD_CLICK_PROGRESS': {
      const task = state.find((task) => task.id === 1)!;
      task.progress! += 1;
      score.progress! += 1;
      if (state[0].progress! >= 10) state[0].isCompleted = true;

      break;
    }
    case 'ADD_DOUBLE_CLICK_PROGRESS': {
      const task = state.find((task) => task.id === 2)!;
      task.progress! += 1;
      score.progress! += 2;
      if (state[1].progress! >= 5) state[1].isCompleted = true;

      break;
    }
    case 'ADD_HOLD_PROGRESS': {
      const task = state.find((task) => task.id === 3)!;
      task.isCompleted = true;

      score.progress! += 5;
      break;
    }
    case 'ADD_DRAG_PROGRESS': {
      const task = state.find((task) => task.id === 4)!;
      task.isCompleted = true;

      break;
    }
    case 'ADD_SWIPE_RIGHT_PROGRESS': {
      const task = state.find((task) => task.id === 5)!;
      task.isCompleted = true;
      score.progress! += randomNumber;

      break;
    }
    case 'ADD_SWIPE_LEFT_PROGRESS': {
      const task = state.find((task) => task.id === 6)!;
      task.isCompleted = true;
      score.progress! += randomNumber;

      break;
    }
    case 'ADD_RESIZE_PROGRESS': {
      const task = state.find((task) => task.id === 7)!;
      task.isCompleted = true;
      score.progress! += randomNumber;

      break;
    }
  }
  if (score.progress! >= 100) state[7].isCompleted = true;
  return [...state];
};

const initialTasks = [
  { id: 1, title: 'Зробити 10 кліків', isCompleted: false, progress: 0 },
  { id: 2, title: 'Зробити подвійний клік 5 разів', isCompleted: false, progress: 0 },
  { id: 3, title: "Утримувати об'єкт 3 секунди", isCompleted: false },
  { id: 4, title: "Перетягнути об'єкт", isCompleted: false },
  { id: 5, title: 'Зробити свайп вправо', isCompleted: false },
  { id: 6, title: 'Зробити свайп вліво', isCompleted: false },
  { id: 7, title: "Змінити розмір об'єкта", isCompleted: false },
  { id: 8, title: 'Отримати 100 очок', isCompleted: false, progress: 0 },
];

const StoreContext = createContext<TContext | null>(null);

export function StoreProvider({ children }: TProvider) {
  const [tasks, dispatchTask] = useReducer(taskReducer, initialTasks);
  const score = tasks[7].progress ?? 0;

  return (
    <StoreContext.Provider
      value={{
        score,
        tasks,
        dispatchTask,
      }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const Store = useContext(StoreContext);
  if (!Store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return Store;
};
