import { useDispatch } from "react-redux";
import "./EditList.css";
import { updateEditedTodo, editTodo } from "../store/todoSlice";
import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";

export default function EditList({ task, taskId }) {
  const [text, setText] = useState(task);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleCancel() {
    dispatch(editTodo(taskId));
  }
  function handleSave() {
    dispatch(
      updateEditedTodo({
        taskId,
        text,
      })
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="edit-list-container">
      <div className="edit-toto-underline">
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          ref={inputRef}
          className="edit-todo-input"
          value={text}
        />
      </div>
      <div className="flex justify-end pt-4 gap-4">
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </div>
    </form>
  );
}
