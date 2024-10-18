import './Counter.scss';
// import { memo } from 'react';

interface CounterProps {
  countTasks: number;
}

function Counter({ countTasks }: CounterProps) {
  return (
    <p className="counter">
      {countTasks} tâche{countTasks > 1 && 's'} terminée
      {countTasks > 1 && 's'}
    </p>
  );
}

export default Counter;
