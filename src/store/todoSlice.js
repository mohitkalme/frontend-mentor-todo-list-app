import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid';
const DATA = [
  {
    id: "todo-0",
    name: "Complete online JavaScript course",
    completed: true,
    listCheckbox: true,
  isEditing:false,

  },
  {
    id: "todo-1",
    name: "10 minutes meditation",
    completed: false,
    listCheckbox: false,
  isEditing:false,


  },
  {
    id: "todo-2",
    name: "Read for 1 hour",
    completed: false,
    listCheckbox: false,
  isEditing:false,

  },
];


const initialState = {
  theme:localStorage.getItem("theme"),
  tasks:DATA,
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    newOrder: (state, action) =>{
      state.tasks = action.payload
    },
    addTodo: (state, action) => {
      const newTask = { id: "todo-" + nanoid(), name: action.payload, completed: false,isEditing:false };
      state.tasks = [newTask, ...state.tasks]
    },
    deleteTodo: (state, action) => {
      const remainingTasks = state.tasks.filter((task) => action.payload !== task.id);
      state.tasks = [...remainingTasks];
    },
    editTodo:(state,action)=>{
      const updateEditTasks = state.tasks.map(task=>{
        if(action.payload === task.id){
          return{
            ...task,
            isEditing:!task.isEditing,
          }
        }
        return task;
      })
      state.tasks = [...updateEditTasks]
    },
    updateEditedTodo:(state,action)=>{
      const updateList = state.tasks.map(task=>{
        if(action.payload.taskId === task.id) {
          return{
            ...task,
            name:action.payload.text,
            isEditing:false,
          }
        }
        return task;
      })
      state.tasks = [...updateList]
    },
    clearCompletedTodo:(state)=>{
      const notCompletedTasks = state.tasks.filter((task) => task.completed !== true);
      state.tasks = [...notCompletedTasks];
    },
    toggleCompletedTodo: (state, action) => {
      const updatedTasks = state.tasks.map((task) => {
        if (action.payload === task.id) {
          return {
            ...task,
            completed: !task.completed,
            listCheckbox: !task.completed,
          };
        }
        return task;
      });

      state.tasks = [...updatedTasks]
    },
  },
})

// Action creators are generated for each case reducer function
export const { addTodo, deleteTodo,editTodo,updateEditedTodo, clearCompletedTodo, toggleCompletedTodo, newOrder} = todoSlice.actions

export default todoSlice.reducer