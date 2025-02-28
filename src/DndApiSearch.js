import React, { useState } from "react";
import axios from "axios";

const DndApiSearch = () => {
  const [category, setCategory] = useState("");
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // Mapeo de categorías a endpoints de la API
  const categoryEndpoints = {
    Classes: "classes",
    Equipment: "equipment",
    Feats: "feats",
    Features: "features",
    Monsters: "monsters",
    Races: "races",
    Spells: "spells",
    Subclasses: "subclasses",
    Subraces: "subraces",
    Traits: "traits",
  };

  const categories = Object.keys(categoryEndpoints);

  // Buscar en la API
  const searchApi = async () => {
    if (!category || !categoryEndpoints[category]) {
      alert("Categoría no válida o no implementada en la API.");
      return;
    }

    try {
      const response = await axios.get(
        `https://www.dnd5eapi.co/api/${categoryEndpoints[category]}`
      );
      setResults(response.data.results || []);
      setSelectedItem(null); // Limpiar la tarjeta de detalles
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
    }
  };

  // Obtener detalles de un elemento seleccionado
  const fetchDetails = async (url) => {
    try {
      const response = await axios.get(`https://www.dnd5eapi.co${url}`);
      setSelectedItem(response.data);
    } catch (error) {
      console.error("Error fetching details:", error);
      setSelectedItem(null);
    }
  };

  // Función para mostrar información específica de la API
  const renderDetails = (data) => {
    if (!data) return null;

    return (
      <div>
        {/* Información básica */}
        {data.name && (
          <h4 style={{ color: "#333", marginBottom: "15px" }}>{data.name}</h4>
        )}
        {data.desc && (
          <p style={{ margin: "5px 0", color: "#666" }}>
            <strong style={{ color: "#555" }}>Descripción:</strong> {data.desc}
          </p>
        )}
        {data.hit_points && (
          <p style={{ margin: "5px 0", color: "#666" }}>
            <strong style={{ color: "#555" }}>Hit Points:</strong>{" "}
            {data.hit_points}
          </p>
        )}
        {data.hit_die && (
          <p style={{ margin: "5px 0", color: "#666" }}>
            <strong style={{ color: "#555" }}>Hit Die:</strong> {data.hit_die}
          </p>
        )}

        {/* Atributos */}
        {(data.strength ||
          data.dexterity ||
          data.constitution ||
          data.intelligence ||
          data.wisdom ||
          data.charisma) && (
          <div style={{ marginBottom: "15px" }}>
            <strong style={{ color: "#555" }}>Atributos:</strong>
            <ul
              style={{
                listStyle: "none",
                paddingLeft: "20px",
                margin: "5px 0",
              }}
            >
              {data.strength && (
                <li style={{ color: "#666" }}>
                  <strong>STR:</strong> {data.strength}
                </li>
              )}
              {data.dexterity && (
                <li style={{ color: "#666" }}>
                  <strong>DEX:</strong> {data.dexterity}
                </li>
              )}
              {data.constitution && (
                <li style={{ color: "#666" }}>
                  <strong>CON:</strong> {data.constitution}
                </li>
              )}
              {data.intelligence && (
                <li style={{ color: "#666" }}>
                  <strong>INT:</strong> {data.intelligence}
                </li>
              )}
              {data.wisdom && (
                <li style={{ color: "#666" }}>
                  <strong>WIS:</strong> {data.wisdom}
                </li>
              )}
              {data.charisma && (
                <li style={{ color: "#666" }}>
                  <strong>CHA:</strong> {data.charisma}
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Habilidades */}
        {data.skills && (
          <div style={{ marginBottom: "15px" }}>
            <strong style={{ color: "#555" }}>Habilidades:</strong>
            <ul
              style={{
                listStyle: "none",
                paddingLeft: "20px",
                margin: "5px 0",
              }}
            >
              {data.skills.map((skill, index) => (
                <li key={index} style={{ color: "#666" }}>
                  <strong>{skill.name}:</strong> {skill.desc}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Acciones */}
        {data.actions && (
          <div style={{ marginBottom: "15px" }}>
            <strong style={{ color: "#555" }}>Acciones:</strong>
            {data.actions.map((action, index) => (
              <div key={index} style={{ margin: "10px 0" }}>
                <p style={{ color: "#666" }}>
                  <strong>{action.name}:</strong> {action.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Proficiencies */}
        {data.proficiencies && (
          <div style={{ marginBottom: "15px" }}>
            <strong style={{ color: "#555" }}>Proficiencies:</strong>
            <ul
              style={{
                listStyle: "none",
                paddingLeft: "20px",
                margin: "5px 0",
              }}
            >
              {data.proficiencies.map((prof, index) => (
                <li key={index} style={{ color: "#666" }}>
                  {prof.name} (+{prof.value})
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Special Abilities */}
        {data.special_abilities && (
          <div style={{ marginBottom: "15px" }}>
            <strong style={{ color: "#555" }}>Habilidades Especiales:</strong>
            {data.special_abilities.map((ability, index) => (
              <div key={index} style={{ margin: "10px 0" }}>
                <p style={{ color: "#666" }}>
                  <strong>{ability.name}:</strong> {ability.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Legendary Actions */}
        {data.legendary_actions && (
          <div style={{ marginBottom: "15px" }}>
            <strong style={{ color: "#555" }}>Acciones Legendarias:</strong>
            {data.legendary_actions.map((action, index) => (
              <div key={index} style={{ margin: "10px 0" }}>
                <p style={{ color: "#666" }}>
                  <strong>{action.name}:</strong> {action.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        maxWidth: "800px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 style={{ textAlign: "center", color: "#333" }}>
        Buscar en la API de D&D 5e
      </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "70%",
          }}
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          onClick={searchApi}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          Buscar
        </button>
      </div>

      {/* Lista de resultados con scroll */}
      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
          backgroundColor: "#fff",
        }}
      >
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {results.map((result, index) => (
            <li key={index} style={{ margin: "10px 0" }}>
              <button
                onClick={() => fetchDetails(result.url)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#007bff",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "16px",
                  width: "100%",
                  textAlign: "left",
                  padding: "5px",
                  borderRadius: "5px",
                  transition: "background 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.background = "#f0f0f0")}
                onMouseOut={(e) => (e.target.style.background = "none")}
              >
                {result.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tarjeta de detalles */}
      {selectedItem && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {renderDetails(selectedItem)}
        </div>
      )}
    </div>
  );
};

export default DndApiSearch;
