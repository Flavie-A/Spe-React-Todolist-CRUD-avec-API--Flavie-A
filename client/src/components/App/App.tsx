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
    setListTasks(resultFetch.data);
  };

  // --- ADD NEW TASK ---
  const addNewTask = async (inputNewTask: string) => {
    // on envoie la nouvelle tache au back
    const result = await axios.post('http://localhost:3000/tasks', {
      label: inputNewTask,
      done: false,
      priority: 'Haute',
      comment: 'pas de commentaires',
      category_id: 1,
    });
    // je mets à jour le state avec la liste renvoyée par le back qui contient la nouvelle tache
    setListTasks((prevTasks) => [...prevTasks, result.data]);
  };

  // --- DELETE TASK --
  const deleteTask = async (taskId: number) => {
    // je supprime la tache coté back
    const result = await axios.delete(`http://localhost:3000/tasks/${taskId}`);
    fetchTasks();
  };

  // --- UPDATE TASK --
  const updateTask = async (taskToUpdate: ITask) => {
    // on modifie la tache coté back
    await axios.put(
      `http://localhost:3000/tasks/${taskToUpdate.id}`,
      {
        label: taskToUpdate.label,
        done: taskToUpdate.done,
        priority: taskToUpdate.priority,
        comment: taskToUpdate.comment,
        category_id: 1,
      }
    );
    const updatedTask = listTasks.map((task) =>
      task.id === taskToUpdate.id ? taskToUpdate : task
    );
        console.log(updatedTask);

    setListTasks(updatedTask);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const countTasks = listTasks.filter((tasks) => tasks.done).length;

  return (
    <div className="app">
      <Form
        addtNewTask={addNewTask}
        inputNewTask={inputNewTask}
        setInputNewTask={setInputNewTask}
      />
      <Counter countTasks={countTasks} />
      <TaskList
        tasks={listTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
