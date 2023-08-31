import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

export function SortableItem(props: { id: string; children: React.ReactNode }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      style={style}
      className={cn(
        "flex gap-2 mb-2 items-end bg-slate-100 px-2 py-2 rounded-md z-0",
        isDragging && "bg-slate-200"
      )}
    >
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={cn("my-auto cursor-grab", isDragging && "cursor-grabbing")}
      >
        <GripVertical />
      </div>
      <div className="flex-1">{props.children}</div>
    </div>
  );
}
