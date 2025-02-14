import React from 'react'
import { ListaDeNombres } from './ListaDeNombres'
import { ListadoApp } from '../components/ListadoApp'
import { Contador } from '../components/Contador'
import {useState} from 'react'
import '../css/cosas.css'
import { useTheme } from "../components/Context/ThemeContext";

export const CosasReact = () => {
  const { theme } = useTheme();
  const [showListN, setShowListN] = useState(false);
  const [showLA, setShowLA] = useState(false);
  const [showC,setShowC]=useState(false);

  return (
    <div className={`Container ${theme}`}>
        <div className="botones">
          <button
            className="boton"
            onClick={() => setShowListN((prevState) => !prevState)}
          >
            {showListN ? "Ocultar ListadoNombres" : "Mostrar ListadoNombres"}
          </button>
          {showListN && <ListaDeNombres />}
        </div>
      
        <div className="botones">
          <button
            className="b2"
            onClick={() => setShowLA((prevState) => !prevState)}
          >
            {showLA ? "Ocultar ListaTarea" : "Mostrar ListaTarea"}
          </button>
          {showLA && <ListadoApp />}
        </div>
      
      <div className="botones">
          <button
            className="b3"
            onClick={() => setShowC((prevState) => !prevState)}
          >
            {showC ? "Ocultar Contador" : "Mostrar Contador"}
          </button>
          {showC && <Contador />}
        </div>
    </div>
  )
}
