import {useState} from 'react';
import '../css/ListaN.css'
import { useTheme } from "../components/Context/ThemeContext";

export const ListaDeNombres=()=>{
    const { theme } = useTheme();
    const[nombres,setNombres]=useState([]);

    const agregarNombre=(nombre)=>{
        setNombres([...nombres,nombre]);
    };

    return(
      <div className={`ln ${theme}`}>
        <h2>Lista de Nombres</h2>
        <div className='lnb'>
          <button onClick={()=>agregarNombre('Juan')}>Agregar Juan</button>
          <button onClick={()=>agregarNombre('Ana')}>Agregar Ana</button>
          <button onClick={()=>agregarNombre('Carlos')}>Agregar Carlos</button>
        </div>
        

        <ul>
            {nombres.map((nombre,index)=>(
                <li key={index}>{nombre}</li>
            ))}
        </ul>
      </div>  
    );
}