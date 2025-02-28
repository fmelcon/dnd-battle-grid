import React from "react";

const Toolbar = ({
  addAllyToken,
  addEnemyToken,
  addEffectArea,
  resetBoard,
  saveGame,
  loadGame,
  exportBoard,
  setTool,
  setCurrentColor,
  currentColor,
  setLineWidth,
  lineWidth,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {/* Herramientas de dibujo */}
      <div>
        <label>Herramientas:</label>
        <button onClick={() => setTool("pencil")}>Lápiz</button>
        <button onClick={() => setTool("eraser")}>Borrador</button>
        <button onClick={() => setTool("square")}>Cuadrado</button>
        <button onClick={() => setTool("circle")}>Círculo</button>
      </div>

      {/* Selector de color */}
      <div>
        <label>Color de línea:</label>
        <input
          type="color"
          value={currentColor}
          onChange={(e) => setCurrentColor(e.target.value)}
        />
      </div>

      {/* Grosor de línea */}
      <div>
        <label>Grosor de línea:</label>
        <input
          type="range"
          min="1"
          max="10"
          value={lineWidth}
          onChange={(e) => setLineWidth(Number(e.target.value))}
        />
      </div>

      {/* Botones de fichas y áreas de efecto */}
      <button
        onClick={addAllyToken}
        style={{ padding: "10px", background: "green", color: "white" }}
      >
        Agregar Aliado
      </button>
      <button
        onClick={addEnemyToken}
        style={{ padding: "10px", background: "black", color: "white" }}
      >
        Agregar Enemigo
      </button>
      <button
        onClick={addEffectArea}
        style={{ padding: "10px", background: "purple", color: "white" }}
      >
        Agregar Área de Efecto
      </button>

      {/* Botones de gestión del tablero */}
      <button
        onClick={resetBoard}
        style={{ padding: "10px", background: "blue", color: "white" }}
      >
        Resetear Tablero
      </button>
      <button
        onClick={saveGame}
        style={{ padding: "10px", background: "orange", color: "white" }}
      >
        Guardar Partida
      </button>
      <button
        onClick={loadGame}
        style={{ padding: "10px", background: "teal", color: "white" }}
      >
        Cargar Partida
      </button>
      <button
        onClick={exportBoard}
        style={{ padding: "10px", background: "brown", color: "white" }}
      >
        Exportar Tablero
      </button>
    </div>
  );
};

export default Toolbar;
