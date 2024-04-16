import { useReducer, useState } from 'react';
import './TaskList.scss';
import { Trash2, Edit, Check } from 'react-feather';
import ITask from '../../@types/task';

interface TaskProps {
  task: ITask;
  // supprTache: (idInputTache: number) => void;
  editTask: (tasks: ITask) => void;
}

function Task({ task, editTask }: TaskProps) {
  const [isModeEdit, setIsModeEdit] = useState(false);
  const [newLabel, setnewLabel] = useState(task.label);

  return (
    //   <li class="item">
    //   <label class="item-label">
    //     <input class="item-checkbox" type="checkbox">
    //     <span>Ranger mon bureau</span>
    //   </label>
    //   <button type="button" class="item-delete">del</button>
    //   <button type="button" class="item-delete">edit</button>
    // </li>

    <li className="item" key={task.label}>
      <label
        className={task.done ? 'item-label item-label--done' : 'item-label'}
      >
        <input
          className="item-checkbox"
          type="checkbox"
          checked={task.done}
          onChange={() => {
            const newTaskDone = {
              id: task.id,
              label: task.label,
              done: !task.done,
            };
            editTask(newTaskDone);
          }}
        />

        {isModeEdit ? (
          <form
            className="item-form"
            onSubmit={(event) => {
              event.preventDefault();
              editTask({
                ...task,
                label: newLabel,
              });
              setIsModeEdit(false);
            }}
          >
            <input
              type="text"
              value={newLabel}
              onChange={(event) => {
                setnewLabel(event.target.value);
              }}
            />
          </form>
        ) : (
          <span>{task.label}</span>
        )}
      </label>
      <button
        className="item-delete"
        type="button"
        onClick={() => {
          const newTaskDone = {
            id: task.id,
            label: task.label,
            done: !task.done,
          };
          editTask(newTaskDone);
        }}
      >
        <Check />
      </button>
      <button type="button" className="item-delete">
        <Trash2 />
      </button>

      <button
        type="button"
        className="item-delete"
        onClick={() => {
          setIsModeEdit(true);
        }}
      >
        <Edit />
      </button>
    </li>
  );
}

export default Task;
