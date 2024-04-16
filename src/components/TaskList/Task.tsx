import { useState } from 'react';
import './TaskList.scss';
import { Trash2, Edit, Check } from 'react-feather';
import ITask from '../../@types/task';

interface TaskProps {
  task: ITask;
  // supprTache: (idInputTache: number) => void;
  doneTask: (tasks: ITask) => void;
  submitTask: (tasks: ITask) => void;
  setListTasks: (value: React.SetStateAction<ITask[]>) => void;
}

function Task({ task, submitTask, doneTask, setListTasks }: TaskProps) {
  const [isModeEdit, setIsModeEdit] = useState(false);
  const [newLabel, setnewLabel] = useState(task.label);
  const submittedTask = {
    id: task.id,
    label: newLabel,
    done: task.done,
  };
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
            const newTaskDone = {
              id: task.id,
              label: task.label,
              done: !task.done,
            };

            doneTask(newTaskDone);
          }}
        />

        {isModeEdit ? (
          <>
            <form
              className="item-form"
              onSubmit={(event) => {
                event.preventDefault();

                submitTask(submittedTask);

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
                submitTask(submittedTask);
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
