import { useEffect, useState } from 'react';
import axios from 'axios';

import ITask from '../../@types/task';

import Counter from '../Counter/Counter';
import Form from '../Form/Form';
import TaskList from '../TaskList/TaskList';

import './App.scss';

function App() {
  const [listTasks, setListTasks] = useState<ITask[]>([]);
  const [inputNewTask, setInputNewTask] = useState<ITask['label']>('');

  const fetchTasks = async () => {
    const resultFetch = await axios.get('http://localhost:3000/tasks');
    console.log(resultFetch);
    const ListeTachesApi = resultFetch.data;
    setListTasks(ListeTachesApi);
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

  const editTask = (tasks: ITask) => {
    const newEditedTask = listTasks.map((task) => {
      if (task.id === tasks.id) {
        return {
          ...task,
          done: !task.done,
        };
      } else {
        return task;
      }
    });
    setListTasks(newEditedTask);
  };

  return (
    <div className="app">
      <Form
        addtNewTask={addtNewTask}
        inputNewTask={inputNewTask}
        setInputNewTask={setInputNewTask}
      />
      <Counter countTasks={countTasks} />
      <TaskList tasks={listTasks} editTask={editTask} />
    </div>
  );
}

export default App;
