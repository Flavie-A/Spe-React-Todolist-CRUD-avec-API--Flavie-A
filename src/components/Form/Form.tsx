import './Form.scss';
// import { Check, Trash, Edit } from 'react-feather';

interface FormProps {
  addtNewTask: (inputNewTask: string) => void;
  setInputNewTask: React.Dispatch<React.SetStateAction<string>>;
  inputNewTask: string;
}

function Form({ addtNewTask, setInputNewTask, inputNewTask }: FormProps) {
  return (
    <form
      id="form"
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
        addtNewTask(inputNewTask);
        setInputNewTask('');
      }}
    >
      <input
        name="addtask"
        type="text"
        className="form-item"
        placeholder="Ajouter une tâche"
        value={inputNewTask}
        onChange={(event) => {
          setInputNewTask(event.target.value);
        }}
      />
    </form>
  );
}

export default Form;
