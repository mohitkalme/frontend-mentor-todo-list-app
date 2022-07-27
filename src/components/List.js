import React from "react";
import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import { useRaisedShadow } from "./use-raised-shadow";
import iconCheck from "../images/icon-check.svg";
import "../App.css";
import { toggleCompletedTodo } from "../store/todoSlice";
import { useDispatch } from "react-redux";
import { ReorderIcon } from "./ReorderIcon";
import MoreOptions from "./MoreOptions";
import EditList from "./EditList";

export default function List({ task }) {
 
  const dispatch = useDispatch();

  const dragControls = useDragControls();

  const y = useMotionValue(0);

  const boxShadow = useRaisedShadow(y);

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 40,
  };

  return (
    <Reorder.Item
      drag="y"
      layout
      transition={spring}
      dragElastic={0.1}
      value={task}
      id={task.id}
      style={{ boxShadow, y }}
      dragControls={dragControls}
    >
      <div className="list-parent relative cursor-pointer flex items-center border border-solid border-transparent dark:border-b-very-dark-grayish-blue border-b-light-border-b  dark:bg-very-dark-desaturated-blue bg-very-light-gray p-3 sm:py-[18px] sm:px-[8px] pl-1 sm:pr-4">
        <ReorderIcon dragControls={dragControls} />
        {task.isEditing ? (
          <EditList task={task.name} taskId={task.id} />
        ) : (
          <>
            <div className="overflow-hidden relative w-5 h-5 sm:w-7 sm:h-7  outline-2 outline outline-hover-light-grayish-blue hover:outline-light-grayish-blue dark:outline-very-dark-grayish-blue dark:hover:outline-dark-grayish-blue rounded-[50%] ">
              <input
                type="checkbox"
                defaultChecked={task.listCheckbox}
                className="list-checkbox relative cursor-pointer border-none outline-0 opacity-0 pointer-events-auto w-full h-full"
                onChange={() => {
                  dispatch(toggleCompletedTodo(task.id));
                }}
              />

              <div className="blue-bg w-full h-full rounded-full flex items-center justify-center">
                <img
                  src={iconCheck}
                  className="w-[12px] h-[12px]"
                  alt="icon check"
                />
              </div>
            </div>

            <p
              id={task.completed && task.listCheckbox ? "strike" : ""}
              className="dark:bg-very-dark-desaturated-blue break-all bg-very-light-gray dark:text-light-grayish-blue text-input-text-light m-0 flex-1 ml-2 sm:ml-3 mr-2 text-base font-normal border-0 outline-0"
            >
              {task.name}
            </p>

            <MoreOptions taskId={task.id} />
          </>
        )}
      </div>
    </Reorder.Item>
  );
}
