import "./List.css";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

export function ReorderIcon({ dragControls }) {
  return (
    <div className="dragIndicator" onPointerDown={(event) => dragControls.start(event, { snapToCursor: true })}>
      <DragIndicatorIcon  />
    </div>
  );
}
