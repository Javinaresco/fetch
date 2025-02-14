import { useState } from "react";
import { AgregarTarea } from './AgregarTarea';
import '../css/LApp.css'
import { useTheme } from "./Context/ThemeContext";

export const ListadoApp = () => {
    const { theme } = useTheme();
    const [arreglo, setArreglo] = useState([
        { nombre: 'Tarea 1', realizada: false },
    ]);

    return (
        <div className={`La ${theme}`}>
            <ul>
                {arreglo.map((tarea) => (
                    <li key={tarea.nombre}>
                        {tarea.nombre} - {tarea.realizada ? 'Sí' : 'No'}
                    </li>
                ))}
            </ul>
            {/* Pass setArreglo to AgregarTarea */}
            <AgregarTarea agregarTarea={setArreglo} />
        </div>
    );
};
