import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import DraggableToken from "./DraggableToken";
import EffectArea from "./EffectArea";
import Toolbar from "./Toolbar";
import CanvasLayer from "./CanvasLayer";
import DndApiSearch from "./DndApiSearch";

const GRID_SIZE = 20;
const TILE_SIZE = 32;
const ENEMY_SIZE = TILE_SIZE * 2;
const CELL_SIZE = 80;
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const BattleGrid = () => {
  const [tokens, setTokens] = useState([]);
  const [effectAreas, setEffectAreas] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#FF0000");
  const [lineWidth, setLineWidth] = useState(3);
  const [tool, setTool] = useState("pencil");
  const [shapes, setShapes] = useState([]);

  // Funciones para agregar fichas, áreas de efecto, etc.
  const addAllyToken = () => {
    const letter = ALPHABET[tokens.length % ALPHABET.length];
    const newToken = {
      id: `token-${tokens.length}`,
      position: { x: CANVAS_SIZE / 2, y: CANVAS_SIZE / 2 },
      color: getRandomColor(),
      size: TILE_SIZE,
      letter: letter,
    };
    setTokens((prevTokens) => [...prevTokens, newToken]);
  };

  const addEnemyToken = () => {
    const letter = ALPHABET[tokens.length % ALPHABET.length];
    const newEnemyToken = {
      id: `token-${tokens.length}`,
      position: { x: CANVAS_SIZE / 2, y: CANVAS_SIZE / 2 },
      color: getRandomColor(),
      size: ENEMY_SIZE,
      letter: letter,
    };
    setTokens((prevTokens) => [...prevTokens, newEnemyToken]);
  };

  const addEffectArea = () => {
    const newEffectArea = {
      id: `effect-${effectAreas.length}`,
      position: { x: CANVAS_SIZE / 2, y: CANVAS_SIZE / 2 },
      size: 100,
      color: "#00FF00",
      shape: "circle",
    };
    setEffectAreas((prevAreas) => [...prevAreas, newEffectArea]);
  };

  // Resetear el tablero
  const resetBoard = () => {
    setTokens([]);
    setEffectAreas([]);
    setShapes([]);
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
  };

  const saveGame = () => {
    const gameState = { tokens, effectAreas, shapes };
    localStorage.setItem("savedGame", JSON.stringify(gameState));
  };

  const loadGame = () => {
    const savedGame = JSON.parse(localStorage.getItem("savedGame"));
    if (savedGame) {
      setTokens(savedGame.tokens);
      setEffectAreas(savedGame.effectAreas);
      setShapes(savedGame.shapes || []);
    }
  };

  const exportBoard = () => {
    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "tablero.png";
    link.click();
  };

  return (
    <DndContext>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          padding: "20px",
        }}
      >
        {/* Grilla y controles */}
        <div style={{ display: "flex", gap: "20px" }}>
          <div
            style={{
              position: "relative",
              border: "2px solid black",
              width: CANVAS_SIZE,
              height: CANVAS_SIZE,
            }}
          >
            <CanvasLayer
              drawing={drawing}
              startDrawing={() => setDrawing(true)}
              draw={() => {}}
              stopDrawing={() => setDrawing(false)}
              currentColor={currentColor}
              lineWidth={lineWidth}
              tool={tool}
              shapes={shapes}
              setShapes={setShapes}
            />
            {tokens.map((token) => (
              <DraggableToken
                key={token.id}
                id={token.id}
                position={token.position}
                color={token.color}
                size={token.size}
                letter={token.letter}
              />
            ))}
            {effectAreas.map((area) => (
              <EffectArea
                key={area.id}
                id={area.id}
                position={area.position}
                size={area.size}
                color={area.color}
                shape={area.shape}
              />
            ))}
          </div>
          <Toolbar
            addAllyToken={addAllyToken}
            addEnemyToken={addEnemyToken}
            addEffectArea={addEffectArea}
            resetBoard={resetBoard}
            saveGame={saveGame}
            loadGame={loadGame}
            exportBoard={exportBoard}
            setTool={setTool}
            setCurrentColor={setCurrentColor}
            currentColor={currentColor}
            setLineWidth={setLineWidth}
            lineWidth={lineWidth}
          />
        </div>

        {/* Componente de búsqueda en la API */}
        <DndApiSearch />
      </div>
    </DndContext>
  );
};

export default BattleGrid;
