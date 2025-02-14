import React, { useState } from "react";
import axios from "axios";
import "../css/Chatbox.css"; // Importar el archivo CSS

export const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "¡Hola! ¿En qué puedo ayudarte?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isChatboxVisible, setIsChatboxVisible] = useState(false); // Estado para controlar la visibilidad del chatbox

  const keywords = ["gato", "gatito", "gatete","felino","miau"];

  // Función para llamar a la API de Gemini
  const callGeminiAPI = async (userMessage) => {
    const apiKey = "AIzaSyC7zwPg0RVSD8f02h32MC2eE8Bv7nfWmHU"; // Reemplaza con tu API Key
    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

    try {
      const response = await axios.post(
        `${url}?key=${apiKey}`,
        {
          contents: [
            {
              parts: [{ text: userMessage }], // Estructura del payload según la API
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Respuesta completa de la API:", response.data); // Para depuración

      // Extraer la respuesta generada por la API
      return (
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Lo siento, no tengo una respuesta en este momento."
      );
    } catch (error) {
      console.error(
        "Error al llamar a la API de Gemini:",
        error.response?.data || error.message
      );
      return "Hubo un error al procesar tu mensaje. Por favor, inténtalo de nuevo.";
    }
  };

  // Manejo del envío de mensajes
  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    // Agregar mensaje del usuario
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: userInput },
    ]);

    // Validar si el mensaje contiene alguna palabra clave
    const containsKeyword = keywords.some((keyword) =>
      userInput.toLowerCase().includes(keyword)
    );

    if (!containsKeyword) {
      // Responder directamente si no contiene palabras clave
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "No puedo responder tu mensaje." },
      ]);
      setUserInput(""); // Limpiar el input
      return;
    }

    // Mostrar mensaje de "procesando"
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", text: "Estoy procesando tu mensaje..." },
    ]);

    try {
      // Llamar a la API de Gemini
      const botResponse = await callGeminiAPI(userInput);

      // Agregar respuesta del bot
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1), // Eliminar el mensaje "procesando"
        { sender: "bot", text: botResponse },
      ]);
    } catch (error) {
      // Mostrar mensaje de error al usuario
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { sender: "bot", text: "Hubo un error al procesar tu mensaje." },
      ]);
    }

    setUserInput(""); // Limpiar el input
  };

  return (
    <>
      <button
        onClick={() => setIsChatboxVisible((prev) => !prev)}
        className="toggle-button"
      >
        {isChatboxVisible ? "Ocultar Chat" : "Mostrar Chat"}
      </button>

      {isChatboxVisible && (
        <div className="chatbot-container">
          <div className="chat-window">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === "bot" ? "bot" : "user"}`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="chat-input"
            />
            <button onClick={handleSendMessage} className="send-button">
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
