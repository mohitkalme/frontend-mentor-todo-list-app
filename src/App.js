import React, { useState, useRef } from "react";
import { Reorder } from "framer-motion"
import "./App.css";
import sun from "./images/icon-sun.svg";
import moon from "./images/icon-moon.svg";
import Form from "./components/Form";
import List from "./components/List";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

function App(props) {
  if (localStorage.getItem("theme") == null) {
    const deviceTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    localStorage.setItem("theme", deviceTheme ? "dark" : "light");
  }

  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  React.useEffect(() => {
    localStorage.setItem("theme", theme);
    
    if(theme==='dark'){
      document.body.style.backgroundColor = `hsl(235, 21%, 11%)`
    }else{
      document.body.style.backgroundColor = `hsl(0, 0%, 98%)`
    }
  }, [theme]);

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");
  const constraintsRef = useRef(null)

  function toggleTaskCompleted(id) {
    console.log("running on render");
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return {
          ...task,
          completed: !task.completed,
          listCheckbox: !task.completed,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([newTask, ...tasks]);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function clearCompleted() {
    const notCompletedTasks = tasks.filter((task) => task.completed !== true);
    setTasks(notCompletedTasks);
  }


  const tasksNoun =
    tasks.filter(FILTER_MAP["Active"]).length > 1 ? "tasks" : "task";
  const itemsLeftText = `${
    tasks.filter(FILTER_MAP["Active"]).length
  } ${tasksNoun} remaining`;

  return (
    // eslint-disable-next-line react/jsx-no-duplicate-props
    <div className={theme}>
      <div className="dark:bg-very-dark-blue bg-very-light-gray h-screen relative">
        <header></header>

        <div className="todo_main flex flex-col mx-auto">
          <div className="flex justify-between mb-9 sm:mb-12">
            <h1 className="main_heading font-bold tracking-[0.75rem] sm:tracking-[1rem] text-3xl text-very-light-gray">
              TODO
            </h1>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <img
                src={theme === "dark" ? sun : moon}
                className="w-5 h-5 sm:w-[26px] sm:h-[26px]"
                alt=""
              />
            </div>
          </div>

          <Form addTask={addTask} />

          <div className="mt-6 ">
            <div className="rounded-md shadow-xl overflow-hidden ">         
                <Reorder.Group 
                axis="y"
                values={tasks}
                style={{display:"flex",flexDirection:"column",overflow:'hidden'}}
                onReorder={setTasks}
                ref={constraintsRef}
                >
                    {
                      tasks
                      .filter(FILTER_MAP[filter])
                      .map((task) => (
                        <List
                        key={task.id}
                          task={task}
                          deleteTask={deleteTask}
                          toggleTaskCompleted={toggleTaskCompleted}
                          constraintsRef={constraintsRef}
                        />
                      ))
                    }
                  </Reorder.Group>
              
              <div className=" flex dark:bg-very-dark-desaturated-blue bg-very-light-gray dark:text-list-bottom-text text-light-bottom-text  text-sm font-bold py-5 px-6 ">
                <div className=" mr-auto sm:mr-0">{itemsLeftText}</div>

                <ul className=" list-none hidden sm:flex mx-auto gap-5 ">
                  <li
                    onClick={() => setFilter("All")}
                    className={`${
                      filter === "All" ? "filterClicked" : ""
                    } dark:hover:text-light-grayish-blue hover:text-input-text-light cursor-pointer`}
                  >
                    All
                  </li>
                  <li
                    onClick={() => setFilter("Active")}
                    className={`${
                      filter === "Active" ? "filterClicked" : ""
                    } dark:hover:text-light-grayish-blue hover:text-input-text-light cursor-pointer`}
                  >
                    Active
                  </li>
                  <li
                    onClick={() => setFilter("Completed")}
                    className={`${
                      filter === "Completed" ? "filterClicked" : ""
                    } dark:hover:text-light-grayish-blue hover:text-input-text-light cursor-pointer`}
                  >
                    Completed
                  </li>
                </ul>

                <div
                  onClick={() => clearCompleted()}
                  className=" dark:hover:text-light-grayish-blue hover:text-input-text-light cursor-pointer"
                >
                  Clear Completed
                </div>
              </div>
            </div>

            <div className=" flex sm:hidden mt-3 shadow-xl rounded-md dark:bg-very-dark-desaturated-blue bg-very-light-gray py-4">
              <ul className=" list-none text-sm font-bold flex mx-auto gap-5 ">
                <li
                  onClick={() => setFilter("All")}
                  className={` dark:text-list-bottom-text  text-light-bottom-text  ${
                    filter === "All" ? "filterClicked" : ""
                  }  cursor-pointer`}
                >
                  All
                </li>
                <li
                  onClick={() => setFilter("Active")}
                  className={` ${
                    filter === "Active" ? "filterClicked" : ""
                  } dark:text-list-bottom-text  text-light-bottom-text  cursor-pointer`}
                >
                  Active
                </li>
                <li
                  onClick={() => setFilter("Completed")}
                  className={` ${
                    filter === "Completed" ? "filterClicked" : ""
                  } dark:text-list-bottom-text  text-light-bottom-text  cursor-pointer`}
                >
                  Completed
                </li>
              </ul>
            </div>

            

            <p className="dark:text-list-bottom-text text-light-bottom-text text-center font-bold text-sm tracking-wider mt-10 sm:mt-12">
              Drag and drop to reorder list
            </p>

            <div className="attribution dark:text-very-light-grayish-blue text-very-dark-desaturated-blue">
      Coded by <a rel="noreferrer" href="https://www.instagram.com/mohitkalme21/?hl=en" target="_blank">Mohit kalme</a>.
    </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
