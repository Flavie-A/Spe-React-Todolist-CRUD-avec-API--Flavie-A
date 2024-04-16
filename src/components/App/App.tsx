import Counter from '../Counter/Counter';
import Form from '../Form/Form';
import TaskList from '../TaskList/TaskList';

import './App.scss';

function App() {
  return (
    <div className="app">
      <Form />
      <Counter />
      <TaskList />
    </div>
  );
}

export default App;
