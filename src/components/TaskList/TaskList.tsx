import Task from './Task';
import './TaskList.scss';
import ITask from '../../@types/task';

interface TaskProps {
  tasks: ITask[];
  // supprTache: (idInputTache: number) => void;
  submitTask: (tasks: ITask) => void;
  doneTask: (tasks: ITask) => void;
  setListTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

function TaskList({ tasks, submitTask, doneTask, setListTasks }: TaskProps) {
  return (
    <ul className="list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          // supprTache={supprTache}
          submitTask={submitTask}
          doneTask={doneTask}
          setListTasks={setListTasks}
        />
      ))}
    </ul>
  );
}

export default TaskList;
