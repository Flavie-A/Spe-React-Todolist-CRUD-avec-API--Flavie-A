import { useEffect, useState } from 'react';
import axios from 'axios';

import ITask from '../../@types/task';

import Counter from '../Counter/Counter';
import Form from '../Form/Form';
import TaskList from '../TaskList/TaskList';

import './App.scss';

function App() {
  const [listTasks, setListTasks] = useState<ITask[]>([]);
  const [inputNewTask, setInputNewTask] = useState('');

  const fetchTasks = async () => {
    const resultFetch = await axios.get('http://localhost:3000/tasks');
    console.log(resultFetch);
    const ListeTachesApi = resultFetch.data;
    setListTasks(ListeTachesApi);
  };

  // --- ADD NEW TASK API ---
  const addTaskToBackAndState = async (inputValue: string) => {
    // on envoie la nouvelle tache au back
    const result = await axios.post('http://localhost:3000/tasks', {
      label: inputNewTask,
      done: false,
    });
    // on mets à jour le state avec la liste renvoyée par le back qui contient la nouvelle tache
    setListTasks([...result.data]);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addtNewTask = (inputNewTask: string) => {
    const idNewTask = Math.max(...listTasks.map((task) => task.id)) + 1;

    const newTask = {
      id: idNewTask,
      label: inputNewTask,
      done: false,
    };

    const newListTasks = [...listTasks, newTask];
    setListTasks(newListTasks);
  };

  const countTasks = listTasks.filter((tasks) => tasks.done).length;

  const doneTask = (tasks: ITask) => {
    const newDoneTask = listTasks.map((task) => {
      if (task.id === tasks.id) {
        return {
          ...task,
          done: !task.done,
        };
      } else {
        return task;
      }
    });
    setListTasks(newDoneTask);
  };

  const submitTask = (submittedTask: ITask) => {
    const newSubmittedTask = listTasks.map((task) => {
      if (task.id === submittedTask.id) {
        return {
          ...task,
          label: submittedTask.label,
          done: submittedTask.done,
        };
      } else {
        return task;
      }
    });
    setListTasks(newSubmittedTask);
  };

  const deleteTask = (idInputTache: number) => {
    const newListAfterDelete = listTasks.filter(
      (listTasks) => listTasks.id !== idInputTache
    );
    setListTasks(newListAfterDelete);
  };

  return (
    <div className="app">
      <Form
        addtNewTask={addTaskToBackAndState}
        inputNewTask={inputNewTask}
        setInputNewTask={setInputNewTask}
      />
      <Counter countTasks={countTasks} />
      <TaskList
        tasks={listTasks}
        doneTask={doneTask}
        submitTask={submitTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
