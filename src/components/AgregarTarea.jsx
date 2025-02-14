import { useState } from 'react';

export const AgregarTarea = ({ agregarTarea }) => { // Rename the prop
    const [task, setTask] = useState('');

    const handleInput = (e) => {
        setTask(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('Agregando');

        if (task.trim() === '') return; // Prevent empty tasks

        const envio = {
            nombre: task,
            realizada: false, // Default to false for new tasks
        };

        agregarTarea((prevTareas) => [...prevTareas, envio]); // Update the state in ListadoApp
        setTask(''); // Clear the input field
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    placeholder="Agregar tarea"
                    value={task}
                    onChange={handleInput}
                />
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
};
