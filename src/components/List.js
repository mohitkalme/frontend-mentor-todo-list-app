import React from "react";
import iconCross from "../images/icon-cross.svg";
import iconCheck from '../images/icon-check.svg';
import '../App.css';

export default function List(props) {
    
  return (
    <div
      id={props.id}
      className="list-parent relative cursor-pointer flex items-center border border-solid border-transparent dark:border-b-very-dark-grayish-blue border-b-light-border-b  dark:bg-very-dark-desaturated-blue bg-very-light-gray p-3 sm:py-[18px] sm:px-[22px]"
    >
      <div className="overflow-hidden relative w-5 h-5 sm:w-7 sm:h-7  outline-2 outline outline-hover-light-grayish-blue hover:outline-light-grayish-blue dark:outline-very-dark-grayish-blue dark:hover:outline-dark-grayish-blue rounded-[50%] ">
        <input
          type="checkbox"
          defaultChecked={props.listCheckbox}
          className="list-checkbox relative cursor-pointer border-none outline-0 opacity-0 pointer-events-auto w-full h-full"
          onChange={()=>{ props.toggleTaskCompleted(props.id)}}
                  
        />

        <div className="blue-bg w-full h-full rounded-full flex items-center justify-center">
          <img src={iconCheck} className="w-[12px] h-[12px]" alt="icon check" />
        </div>
      </div>

      <p id={(props.completed && props.listCheckbox) ? "strike" : ""} className="dark:bg-very-dark-desaturated-blue break-all bg-very-light-gray dark:text-light-grayish-blue text-input-text-light m-0 flex-1 ml-2 sm:ml-5 text-base font-normal border-0 outline-0">
        {props.name}
      </p>
      <div id="cross" className="block sm:hidden"  onClick={() => props.deleteTask(props.id)}>
        <img src={iconCross} alt="cross icon" />
      </div>
    </div>
  );
}
