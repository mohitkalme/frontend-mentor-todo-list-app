import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import "./MoreOptions.css";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo } from "../store/todoSlice";
import IconButton from "@mui/material/IconButton";

export default function MoreOptions({ taskId }) {
  const dispatch = useDispatch();

  const popupRef = useRef(null);

  function handleChange(e) {
    e.stopPropagation();
    popupRef.current.classList.add("open");
  }

  function handleDropdownEditAction(e) {
    setTimeout(() => {
      dispatch(editTodo(taskId));
      popupRef.current.classList.remove("open");
    }, 50);
  }
  function handleDropdownDeleteAction(e) {
    setTimeout(() => {
      dispatch(deleteTodo(taskId));
      popupRef.current.classList.remove("open");
    }, 50);
  }
  function handleButtonFocusChange(e) {
    setTimeout(() => {
      if (popupRef.current.classList.contains("open")) {
        popupRef.current.classList.remove("open");
      }
    }, 250);
  }
  return (
    <div className="moreOptionsContainer">
      <div className="dropdown" ref={popupRef}>
        <div className="dropdown-item" onClick={handleDropdownEditAction}>
          <button className="dropdown-button">
            <EditOutlinedIcon />
            <span className="dropdown-text">Edit</span>
          </button>
        </div>

        <div className="dropdown-item" onClick={handleDropdownDeleteAction}>
          <button className="dropdown-button">
            <DeleteOutlinedIcon />
            <span className="dropdown-text">Delete</span>
          </button>
        </div>
      </div>

      <div onClick={handleChange} onBlur={handleButtonFocusChange}>
        <IconButton color="primary" aria-label="More Options">
          <MoreVertIcon />
        </IconButton>
      </div>
    </div>
  );
}
