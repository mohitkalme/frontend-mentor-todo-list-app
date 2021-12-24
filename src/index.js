import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const DATA = [
  { id: "todo-0", name: "Complete online JavaScript course", completed: true, listCheckbox:true },
  { id: "todo-1", name: "Jog around the park 3x", completed: false, listCheckbox:false },
  { id: "todo-2", name: "10 minutes meditation", completed: false, listCheckbox:false },
  { id: "todo-3", name: "Read for 1 hour", completed: false, listCheckbox:false },
  { id: "todo-4", name: "Pick up groceries", completed: false, listCheckbox:false },
  { id: "todo-5", name: "Complete Todo App on Frontend Mentor", completed: false, listCheckbox:false },
];

ReactDOM.render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
