import "./List.css";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

export function ReorderIcon({ dragControls }) {
  return (
    <div className="dragIndicator">
      <DragIndicatorIcon onPointerDown={(event) => dragControls.start(event)} />
    </div>
  );
}
