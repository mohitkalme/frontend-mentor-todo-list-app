import "./List.css";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

export function ReorderIcon({ dragControls }) {
  return (
    <div className="dragIndicator" onMouseDown={(event) => dragControls.start(event)}>
      <DragIndicatorIcon  />
    </div>
  );
}
