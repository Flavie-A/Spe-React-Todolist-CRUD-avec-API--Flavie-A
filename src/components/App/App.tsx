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
    // console.log(resultFetch);
    const ListeTachesApi = resultFetch.data;
    setListTasks(ListeTachesApi);
  };

  // --- ADD NEW TASK API ---
  const addTaskToBackAndState = async (inputNewTask: string) => {
    // on envoie la nouvelle tache au back
    const envoi = await axios.post('http://localhost:3000/tasks', {
      label: inputNewTask,
      done: false,
    });
    // on mets à jour le state avec la liste renvoyée par le back qui contient la nouvelle tache
    setListTasks([...envoi.data]);
  };

  // --- DELETE TASK --
  const deleteTaskToBackAndState = async (taskId: number) => {
    // on supprime la tache coté back
    const suppression = await axios.delete(
      `http://localhost:3000/tasks/${taskId}`
    );
    // et on met à jour la liste dans le state
    setListTasks([...suppression.data]);
  };

  // --- UPDATE TASK --
  const updateTaskToBackAndState = async (taskToUpdate: ITask) => {
    console.log(taskToUpdate);
    // on modifie la tache coté back
    const tache = await axios.put(
      `http://localhost:3000/tasks/${taskToUpdate.id}`,
      taskToUpdate
    );
    // on met à jour la tache dans le state
    const updatedTask = listTasks.map((task) =>
      task.id === taskToUpdate.id ? taskToUpdate : task
    );
    setListTasks(updatedTask);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const countTasks = listTasks.filter((tasks) => tasks.done).length;

  //si on envoie vers l'API ça sert plus à rien :
  // const addtNewTask = (inputNewTask: string) => {
  //   const idNewTask = Math.max(...listTasks.map((task) => task.id)) + 1;

  //   const newTask = {
  //     id: idNewTask,
  //     label: inputNewTask,
  //     done: false,
  //   };

  //   const newListTasks = [...listTasks, newTask];
  //   setListTasks(newListTasks);
  // };

  // const updateTask = (taskToUpdate: ITask) => {
  //   const updatedTask = listTasks.map((task) =>
  //     task.id === taskToUpdate.id ? taskToUpdate : task
  //   );
  //   setListTasks(updatedTask);
  // };

  // Décomposition de update avec done et submit
  // const doneTask = (tasks: ITask) => {
  //   const newDoneTask = listTasks.map((task) => {
  //     if (task.id === tasks.id) {
  //       return {
  //         ...task,
  //         done: !task.done,
  //       };
  //     } else {
  //       return task;
  //     }
  //   });
  //   setListTasks(newDoneTask);
  // };
  // const submitTask = (submittedTask: ITask) => {
  //   const newSubmittedTask = listTasks.map((task) => {
  //     if (task.id === submittedTask.id) {
  //       return {
  //         ...task,
  //         label: submittedTask.label,
  //         done: submittedTask.done,
  //       };
  //     } else {
  //       return task;
  //     }
  //   });
  //   setListTasks(newSubmittedTask);
  // };

  // const deleteTask = (idInputTache: number) => {
  //   const newListAfterDelete = listTasks.filter(
  //     (listTasks) => listTasks.id !== idInputTache
  //   );
  //   setListTasks(newListAfterDelete);
  // };

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
        updateTask={updateTaskToBackAndState}
        deleteTask={deleteTaskToBackAndState}
      />
    </div>
  );
}

export default App;
