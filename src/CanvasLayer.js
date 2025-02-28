import React, { useRef, useEffect, useState } from "react";

const CanvasLayer = ({
  drawing,
  startDrawing,
  draw,
  stopDrawing,
  currentColor,
  lineWidth,
  tool,
  shapes,
  setShapes,
}) => {
  const canvasRef = useRef(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  // Función para dibujar la grilla
  const drawGrid = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#d3d3d3";
    ctx.lineWidth = 1;

    for (let x = 0; x <= canvas.width; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = 0; y <= canvas.height; y += 80) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  };

  useEffect(() => {
    drawGrid(); // Dibujar la grilla al cargar el componente
  }, []);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStartPos({ x, y });
    startDrawing(e);
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === "pencil") {
      draw(e);
    } else if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0, 0, 0, 1)";
      ctx.lineWidth = lineWidth;
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else if (tool === "square" || tool === "circle") {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid(); // Redibujar la grilla
      shapes.forEach((shape) => {
        if (shape.type === "square") {
          ctx.strokeStyle = shape.color;
          ctx.lineWidth = shape.lineWidth;
          ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        } else if (shape.type === "circle") {
          ctx.strokeStyle = shape.color;
          ctx.lineWidth = shape.lineWidth;
          ctx.beginPath();
          ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      if (tool === "square") {
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
      } else if (tool === "circle") {
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        const radius = Math.sqrt((x - startPos.x) ** 2 + (y - startPos.y) ** 2);
        ctx.arc(startPos.x, startPos.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  };

  const handleMouseUp = (e) => {
    if (tool === "square" || tool === "circle") {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newShape = {
        id: `shape-${shapes.length}`,
        type: tool,
        x: startPos.x,
        y: startPos.y,
        width: tool === "square" ? x - startPos.x : 0,
        height: tool === "square" ? y - startPos.y : 0,
        radius:
          tool === "circle"
            ? Math.sqrt((x - startPos.x) ** 2 + (y - startPos.y) ** 2)
            : 0,
        color: currentColor,
        lineWidth: lineWidth,
      };

      setShapes((prevShapes) => [...prevShapes, newShape]);
    }
    stopDrawing();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "source-over";
  };

  return (
    <canvas
      ref={canvasRef}
      width={1600}
      height={1600}
      style={{ position: "absolute", top: 0, left: 0 }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
};

export default CanvasLayer;
