import Task from './Task';
import './TaskList.scss';
import ITask from '../../@types/task';

interface TaskProps {
  tasks: ITask[];
  updateTask: (taskToUpdate: ITask) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
}

function TaskList({ tasks, updateTask, deleteTask }: TaskProps) {
  return (
    <ul className="list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
