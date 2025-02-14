import { useReducer } from "react";
import { useTheme } from "../components/Context/ThemeContext"; // Import the useTheme hook
import '../css/Reducer.css'

export const ComprasReducer = () => {
    const { theme } = useTheme();
    const initialState = [
        { id: 1, title: "Producto 1", price: 10.99, cantidad: 1 },
        { id: 2, title: "Producto 2", price: 15.49, cantidad: 2 },
    ];

    const comprasReducer = (state = initialState, action) => {
        switch (action.type) {
            case '[CARRITO] Agregar Compra':
                return [...state, action.payload];

            case '[CARRITO] Aumentar Cantidad Compra':
                return state.map(item => {
                    if (item.id === action.payload) {
                        return { ...item, cantidad: item.cantidad + 1 };
                    }
                    return item;
                });

            case '[CARRITO] Disminuir Cantidad Compra':
                return state.map(item => {
                    if (item.id === action.payload && item.cantidad > 0) {
                        return { ...item, cantidad: item.cantidad - 1 };
                    }
                    return item;
                });

            case '[CARRITO] Eliminar Compra':
                return state.filter(compra => compra.id !== action.payload);

            default:
                return state;
        }
    };

    const agregarCompra = () => {
        const newProduct = { id: Date.now(), title: "Nuevo Producto", price: 12.99, cantidad: 1 };
        const action = {
            type: '[CARRITO] Agregar Compra',
            payload: newProduct,
        };
        dispatch(action);
    };

    const aumentarCantidad = (id) => {
        const action = {
            type: '[CARRITO] Aumentar Cantidad Compra',
            payload: id,
        };
        dispatch(action);
    };

    const disminuirCantidad = (id) => {
        const action = {
            type: '[CARRITO] Disminuir Cantidad Compra',
            payload: id,
        };
        dispatch(action);
    };

    const eliminarCompra = (id) => {
        const action = {
            type: '[CARRITO] Eliminar Compra',
            payload: id,
        };
        dispatch(action);
    };

    const [listaCompras, dispatch] = useReducer(comprasReducer, initialState);

    const calcularTotal = () => {
        return listaCompras.reduce((total, item) => total + item.price * item.cantidad, 0).toFixed(2);
    };

    return (
        <div className={`red ${theme}`}>
            <table>
                <tbody>
                    {listaCompras.map(item => (
                        <tr key={item.id}>
                            <th>{item.title}</th>
                            <td>{item.price}</td>
                            <td>
                                <button className="btn" onClick={() => disminuirCantidad(item.id)}>-</button>
                                <span className="btn-cant">{item.cantidad}</span>
                                <button className="btn2" onClick={() => aumentarCantidad(item.id)}>+</button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn-El"
                                    onClick={() => eliminarCompra(item.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="btn-add" onClick={agregarCompra}>
                Agregar Compra
            </button>

            <div className="total-price">
                <h3>Total: ${calcularTotal()}</h3>
            </div>
        </div>
    );
};
