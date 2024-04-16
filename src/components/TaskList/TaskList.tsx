import Task from './Task';
import './TaskList.scss';

function TaskList() {
  return (
    <ul className="list">
      <Task />
      <Task />
      <Task />
    </ul>
  );
}

export default TaskList;
