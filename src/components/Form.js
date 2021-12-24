import React from 'react';
import '../App.css'

export default function Form(props) {
    const [name, setName] = React.useState('');


    function handleSubmit(e) {
      e.preventDefault();
      if (!name.trim()) {
        return;
      }
      props.addTask(name);
      setName("");
    }
  
  
    function handleChange(e) {
      setName(e.target.value);
    }
    return(
        <form  className="flex items-center rounded-md  shadow-lg dark:bg-very-dark-desaturated-blue bg-very-light-gray p-3 sm:py-[18px] sm:px-[22px]" onSubmit={handleSubmit}>

        
            <div  onClick={handleSubmit} className={`cursor-pointer outline-2 outline outline-hover-light-grayish-blue dark:outline-very-dark-grayish-blue ${name.length >=1 ? "blue-outline":""} w-5 h-5 sm:w-7 sm:h-7 rounded-[50%] `}>
              <input
                type="checkbox"
                className="cursor-pointer border-none outline-0 opacity-0 w-full h-full"
              />
            </div>

            <input
              className="dark:bg-transparent bg-transparent dark:text-light-grayish-blue text-input-text-light m-0 flex-1 ml-2 sm:ml-5 text-base font-normal border-0 outline-0"
              type="text"
              placeholder="Create a new todo..."
              name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
            />
        
        </form>

    )
}