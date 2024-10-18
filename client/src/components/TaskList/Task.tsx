import { useState } from 'react';
import './TaskList.scss';
import { Trash2, Edit, Check } from 'react-feather';
import ITask from '../../@types/task';

interface TaskProps {
  task: ITask;
  deleteTask: (taskId: number) => Promise<void>;
  updateTask: (taskToUpdate: ITask) => Promise<void>;
}

function Task({ task, updateTask, deleteTask }: TaskProps) {
  const [isModeEdit, setIsModeEdit] = useState(false);
  const [newLabel, setnewLabel] = useState(task.label);

  return (
    <li className="item" key={task.label}>
      <label
        className={task.done ? 'item-label item-label--done' : 'item-label'}
      >
        <input
          className="item-checkbox"
          type="checkbox"
          checked={task.done}
          onChange={() => {
            const updateDone = {
              id: task.id,
              label: task.label,
              done: !task.done,
              priority: task.priority,
              comment: task.comment,
              category_id:1,
            };
            updateTask(updateDone);
            // on peut aussi écrire comme ça :
            // updateTask({ ...task, done: !task.done });
          }}
        />

        {isModeEdit ? (
          <>
            <form
              className="item-form"
              onSubmit={(event) => {
                event.preventDefault();

                const updateLabel = {
                  id: task.id,
                  label: newLabel,
                  done: task.done,
                  priority: task.priority,
                  comment: task.comment,
                };
                updateTask(updateLabel);
                // updateTask({ ...task, label: newLabel });
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
            <button
              className="item-delete"
              type="button"
              onClick={() => {
                const updateLabel = {
                  id: task.id,
                  label: newLabel,
                  done: task.done,
                  priority: task.priority,
                  comment: task.comment
                };
                updateTask(updateLabel);
                setIsModeEdit(false);
              }}
            >
              <Check />
            </button>
          </>
        ) : (
          <span>{task.label}</span>
        )}
      </label>

      <button
        type="button"
        className="item-delete"
        onClick={() => {
          deleteTask(task.id);
        }}
      >
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
