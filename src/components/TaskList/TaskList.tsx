import Task from './Task';
import './TaskList.scss';
import ITasks from '../../@types/task';

interface TaskProps {
  tasks: ITasks[];
  // supprTache: (idInputTache: number) => void;
  editTask: (tasks: ITasks) => void;
}

function TaskList({ tasks, editTask }: TaskProps) {
  return (
    <ul className="list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          // supprTache={supprTache}
          editTask={editTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
