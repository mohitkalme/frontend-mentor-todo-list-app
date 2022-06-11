import React, { useState } from "react";
import "./App.css";
import bgDesktopDark from "./images/bg-desktop-dark.jpg";
import bgDesktopLight from "./images/bg-desktop-light.jpg";
import bgMobileDark from "./images/bg-mobile-dark.jpg";
import bgMobileLight from "./images/bg-mobile-light.jpg";
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
  }, [theme]);

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

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
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function clearCompleted() {
    const notCompletedTasks = tasks.filter((task) => task.completed !== true);
    setTasks(notCompletedTasks);
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <List
        id={task.id}
        name={task.name}
        completed={task.completed}
        toggleTaskCompleted={toggleTaskCompleted}
        listCheckbox={task.listCheckbox}
        deleteTask={deleteTask}
        key={task.id}
      />
    ));

  const tasksNoun =
    tasks.filter(FILTER_MAP["Active"]).length > 1 ? "tasks" : "task";
  const itemsLeftText = `${
    tasks.filter(FILTER_MAP["Active"]).length
  } ${tasksNoun} remaining`;

  return (
    // eslint-disable-next-line react/jsx-no-duplicate-props
    <div className={theme}>
      <div className="dark:bg-very-dark-blue bg-very-light-gray h-screen relative">
        <picture>
          <source
            media="(min-width: 640px)"
            srcSet={theme === "dark" ? bgDesktopDark : bgDesktopLight}
          />
          <source
            media="(min-width: 320px)"
            srcSet={theme === "dark" ? bgMobileDark : bgMobileLight}
          />
          <img
            src={theme === "dark" ? bgDesktopDark : bgDesktopLight}
            alt="Hallway with blue filter"
          />
        </picture>

        <div className="flex flex-col absolute top-12 sm:top-[78px]  left-[24px] right-[24px] sm:max-w-[33.75rem] sm:mx-auto">
          <div className="flex justify-between mb-9 sm:mb-12">
            <h1 className="font-bold tracking-[0.75rem] sm:tracking-[1rem] text-xl sm:text-3xl text-very-light-gray">
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
              <div className="flex flex-col max-h-80 overflow-x-hidden overflow-y-auto scrollbar">
                {taskList.reverse()}
              </div>
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

            <div className=" flex sm:hidden mt-4 shadow-xl rounded-md dark:bg-very-dark-desaturated-blue bg-very-light-gray py-4">
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
              Drag and drop to reorder list- coming soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
