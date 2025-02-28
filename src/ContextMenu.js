import React from "react";

const ContextMenu = ({ position, onDelete }) => {
  const style = {
    position: "absolute",
    left: position.x,
    top: position.y,
    backgroundColor: "white",
    border: "1px solid #ccc",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    padding: "10px",
    zIndex: 1000,
  };

  return (
    <div style={style}>
      <button onClick={onDelete}>Eliminar</button>
    </div>
  );
};

export default ContextMenu;
