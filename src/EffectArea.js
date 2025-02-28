import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const EffectArea = ({ id, position, size, color, shape }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    position: "absolute",
    left: transform ? position.x + transform.x : position.x,
    top: transform ? position.y + transform.y : position.y,
    width: size,
    height: size,
    backgroundColor: color,
    opacity: 0.2,
    borderRadius: shape === "circle" ? "50%" : "0%",
    border: `2px dashed ${color}`,
    cursor: "move",
    userSelect: "none",
    transform: CSS.Translate.toString(transform),
  };

  return <div ref={setNodeRef} style={style} {...listeners} {...attributes} />;
};

export default EffectArea;
